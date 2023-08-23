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
        field: "employeecode",
        flex: 1,
        headerName: "Code",
        minWidth: 200,
      },
      {
        field: "title",
        flex: 1,
        headerName: "Title",
        minWidth: 200,
      },
      {
        field: "firstname",
        flex: 1,
        headerName: "First Name",
        minWidth: 150,
      },
      {
        field: "lastname",
        flex: 1,
        headerName: "Last Name",
        minWidth: 150,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }: any) {
          return (
            <>
              <ShowButton hideText recordItemId={row.employeecode} />
              {/* <DeleteButton hideText recordItemId={row.employeecode} /> */}
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
        getRowId={(row) => row.employeecode}
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
