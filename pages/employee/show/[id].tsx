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

export const EmployeeShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading} title="Employee">
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Title
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          First name
        </Typography>
        <TextField value={record?.firstname} />
        <Typography variant="body1" fontWeight="bold">
          Last Name
        </Typography>
        <TextField value={record?.lastname} />
        <Typography variant="body1" fontWeight="bold">
          Code
        </Typography>
        <NumberField value={record?.employeecode ?? ""} />
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

export default EmployeeShow;
