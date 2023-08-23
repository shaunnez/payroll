import { Edit } from "@refinedev/mui";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

export const PaypacketEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const [data, setData] = useState({} as any);
  const {
    saveButtonProps,
    handleSubmit,
    getValues,
    refineCore: { queryResult, onFinish },
    register,
    control,
    formState: { errors },
  } = useForm();

  const paypacketData = queryResult?.data?.data;

  // quick prototype - should use standard form UI error logic
  const validate = () => {
    if (!data.code) {
      alert("Please enter in a code");
      return false;
    }
    if (!data.name) {
      alert("Please enter in a name");
      return false;
    }
    if (data.hoursWorked === undefined || data.hoursWorked === null) {
      alert("Please enter in hours worked");
      return false;
    }
    if (data.payRate === undefined || data.payRate === null) {
      alert("Please enter in a pay rate");
      return false;
    }
    if (data.paymentValue === undefined || data.paymentValue === null) {
      alert("Please enter in a pay rate");
      return false;
    }
    return true;
  };
  return (
    <Edit
      saveButtonProps={{
        ...saveButtonProps,
        onClick: (e) => {
          e.preventDefault();
          if (validate()) {
            onFinish(data);
          }
        },
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("id", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("paypacket.fields.id")}
          name="id"
          disabled
        />
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
          disabled
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
          disabled
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
          disabled
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          {paypacketData?.components?.map((item: any, index: number) => (
            <>
              <h4>{item.name}</h4>

              <div
                style={{
                  display: "flex",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  gap: "10px",
                }}
              >
                <TextField
                  key={index}
                  {...register(`components.${index}.hoursWorked`, {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.components?.[index]}
                  helperText={
                    (errors as any)?.components?.[index]?.message as string
                  }
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="number  "
                  label={"Hours Worked"}
                  name={`components.${index}.hoursWorked`}
                  disabled
                />
                <TextField
                  key={index}
                  {...register(`components.${index}.payRate`, {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.components?.[index]}
                  helperText={
                    (errors as any)?.components?.[index]?.message as string
                  }
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="number"
                  label={"Pay Rate"}
                  name={`components.${index}.payRate`}
                  disabled
                />
                <TextField
                  key={index}
                  {...register(`components.${index}.paymentValue`, {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.components?.[index]}
                  helperText={
                    (errors as any)?.components?.[index]?.message as string
                  }
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="number"
                  label={"Payment Value"}
                  name={`components.${index}.paymentValue`}
                  disabled
                />
              </div>
            </>
          ))}

          <h4>Add New Component</h4>

          <div
            style={{
              display: "flex",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              gap: "10px",
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={"Code"}
              onChange={(e) => {
                setData({ ...data, code: e.target.value?.toUpperCase() });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="text"
              label={"Name"}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              label={"Hours Worked"}
              onChange={(e) => {
                setData({
                  ...data,
                  hoursWorked: Number(e.target.value?.toUpperCase()),
                });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              label={"Pay Rate"}
              onChange={(e) => {
                setData({
                  ...data,
                  payRate: Number(e.target.value?.toUpperCase()),
                });
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              InputLabelProps={{ shrink: true }}
              type="number"
              label={"Payment Value"}
              onChange={(e) => {
                setData({
                  ...data,
                  paymentValue: Number(e.target.value?.toUpperCase()),
                });
              }}
            />
          </div>
        </Box>
      </Box>
    </Edit>
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

export default PaypacketEdit;
