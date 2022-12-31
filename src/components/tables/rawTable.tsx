import React from "react";
import { useAppSelector } from "../../store/store";
import { useGetRawQuery } from "../../store/api/TablesApi";
import { GridColumns } from "@mui/x-data-grid";
import TableWrapper from "../TableWrapper";

const RawTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetRawQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90
        },
        {
            field: "RawName",
            headerName: "Raw Name",
            width: 150
        },
        {
            field: "Unit",
            headerName: "Unit",
            width: 90
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} />;
};

export default RawTable;
