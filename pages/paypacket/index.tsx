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

export default function EmployeeList() {
  const { dataGridProps, tableQueryResult } = useDataGrid({
    syncWithLocation: true,
    liveMode: "auto",
  });
  const columns = React.useMemo<any>(
    () => [
      {
        field: "id",
        flex: 1,
        headerName: "ID",
        minWidth: 50,
      },
      {
        field: "employeeCode",
        flex: 1,
        headerName: "Employee Code",
        minWidth: 50,
      },
      {
        field: "status",
        flex: 1,
        headerName: "Status",
        minWidth: 150,
      },
      {
        field: "date",
        flex: 1,
        headerName: "Date",
        minWidth: 150,
      },
      {
        field: "components",
        flex: 1,
        headerName: "Components",
        minWidth: 150,
        sortable: false,
        filterable: false,
        renderCell: function render({ row }: any) {
          return row?.components?.length;
        },
      },
      {
        field: "total",
        flex: 1,
        headerName: "Total Payment Value",
        minWidth: 180,
        sortable: false,
        filterable: false,
        renderCell: function render({ row }: any) {
          const sum = row.components.reduce((accumulator: any, object: any) => {
            return accumulator + object.paymentValue;
          }, 0);
          return (
            "$" +
            sum.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        },
      },
      {
        field: "total_hours",
        flex: 1,
        headerName: "Total Hours",
        minWidth: 150,
        sortable: false,
        filterable: false,
        renderCell: function render({ row }: any) {
          const sum = row.components.reduce((accumulator: any, object: any) => {
            return accumulator + (object.hoursWorked || 0);
          }, 0);
          return sum.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }: any) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
              <EditButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
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
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
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
