import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { useGetNormaQuery } from "../../store/api/TablesApi";
import { useAppSelector } from "../../store/store";
import TableWrapper from "../TableWrapper";

const NormaTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetNormaQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90
        },
        {
            field: "ProductId",
            headerName: "Product ID",
            width: 90
        },
        {
            field: "FashionId",
            headerName: "Fashion ID",
            width: 110
        },
        {
            field: "RawId",
            headerName: "Raw ID",
            width: 90
        },
        {
            field: "CountOfRaw",
            headerName: "Count Of Raw",
            width: 110
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} />;
};

export default NormaTable;
