import {
  useShow,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TextFieldComponent as TextField,
  NumberField,
} from "@refinedev/mui";
import { Typography, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const ComponentShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {translate("component.fields.code")}
        </Typography>
        <TextField value={record?.code} />
        <Typography variant="body1" fontWeight="bold">
          {translate("component.fields.name")}
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          {translate("component.fields.hoursWorked")}
        </Typography>
        <NumberField value={record?.hoursWorked ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("component.fields.payRate")}
        </Typography>
        <NumberField value={record?.payRate ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          {translate("component.fields.paymentValue")}
        </Typography>
        <NumberField value={record?.paymentValue ?? ""} />
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

export default ComponentShow;
