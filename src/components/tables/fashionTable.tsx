import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { useAppSelector } from "../../store/store";
import { useGetFashionQuery } from "../../store/api/TablesApi";
import TableWrapper from "../TableWrapper";

const FashionTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetFashionQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90,
            headerAlign: "center"
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} />;
};

export default FashionTable;
