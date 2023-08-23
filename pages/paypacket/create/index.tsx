import { Create } from "@refinedev/mui";
import { Box, TextField } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const PaypacketCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("status", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.status}
          helperText={(errors as any)?.status?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={translate("paypacket.fields.status")}
          name="status"
        />
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register("date", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.date}
          helperText={(errors as any)?.date?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={translate("paypacket.fields.date")}
          name="date"
        />
        <TextField
          {...register("employeeCode", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.employeeCode}
          helperText={(errors as any)?.employeeCode?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("paypacket.fields.employeeCode")}
          name="employeeCode"
        />
      </Box>
    </Create>
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

export default PaypacketCreate;
