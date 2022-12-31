import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { useAppSelector } from "../../store/store";
import TableWrapper from "../TableWrapper";
import { useGetFormattedNormaQuery } from "../../store/api/TablesApi";

const FormattedNormaTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetFormattedNormaQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90
        },
        {
            field: "ProductName",
            headerName: "Product Name",
            width: 150
        },
        {
            field: "FashionId",
            headerName: "Fashion ID",
            width: 110
        },
        {
            field: "RawName",
            headerName: "Raw Name",
            width: 150
        },
        {
            field: "CountOfRaw",
            headerName: "Count Of Raw",
            width: 110
        },
        {
            field: "Unit",
            headerName: "Unit",
            width: 80
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} isExpanded={true} />;
};

export default FormattedNormaTable;
