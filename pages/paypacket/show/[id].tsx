import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TextFieldComponent as TextField,
  DateField,
  TagField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const PaypacketShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("paypacket.fields.id")}
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("paypacket.fields.status")}
        </Typography>
        <TextField value={record?.status} />
        <Typography variant="body1" fontWeight="bold">
          {translate("paypacket.fields.date")}
        </Typography>
        <DateField value={record?.date} />
        <Typography variant="body1" fontWeight="bold">
          {translate("paypacket.fields.employeeCode")}
        </Typography>
        <NumberField value={record?.employeeCode ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("paypacket.fields.components")}
        </Typography>
        <Stack direction="column" spacing={1}>
          {record?.components?.map((item: any) => (
            <>
              <TagField
                style={{ textAlign: "left", justifyContent: "flex-start" }}
                value={`${item?.code}: Hours ${
                  item.hoursWorked || "N/A"
                }. Payrate: $${
                  item.payRate
                    ? item.payRate.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : "0.00"
                }. Payment Value:  $${item.paymentValue?.toLocaleString(
                  "en-US",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}`}
                key={item?.name}
              />
            </>
          ))}
        </Stack>
      </Stack>
    </Show>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translateProps,
    },
  };
};

export default PaypacketShow;
