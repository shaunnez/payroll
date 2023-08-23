import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MuiListInferencer } from "@refinedev/inferencer/mui";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ComponentList() {
  const { dataGridProps, tableQueryResult } = useDataGrid({
    syncWithLocation: true,
    liveMode: "auto",
  });
  const columns = React.useMemo<any>(
    () => [
      {
        field: "code",
        flex: 1,
        headerName: "Code",
        minWidth: 200,
      },
      {
        field: "name",
        flex: 1,
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "hoursWorked",
        flex: 1,
        headerName: "Hours Worked",
        minWidth: 200,
      },
      {
        field: "payRate",
        flex: 1,
        headerName: "Pay Rate",
        minWidth: 150,
      },
      {
        field: "paymentValue",
        flex: 1,
        headerName: "Payment Value",
        minWidth: 150,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }: any) {
          return (
            <>
              <ShowButton hideText recordItemId={row.code} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        getRowId={(row) => row.code}
      />
    </List>
  );
  // return <MuiListInferencer />;
}

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
