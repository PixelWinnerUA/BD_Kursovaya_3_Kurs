import React from "react";
import { useAppSelector } from "../../store/store";
import { useGetProductQuery } from "../../store/api/TablesApi";
import { GridColumns } from "@mui/x-data-grid";
import TableWrapper from "../TableWrapper";

const ProductTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetProductQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90
        },
        {
            field: "ProductName",
            headerName: "Product Name",
            width: 120
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} />;
};

export default ProductTable;
