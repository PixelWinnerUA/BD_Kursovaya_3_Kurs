import React from "react";
import TableWrapper from "../TableWrapper";
import { useAppSelector } from "../../store/store";
import { useGetPlanQuery } from "../../store/api/TablesApi";
import { GridColumns } from "@mui/x-data-grid";

const PlanTable = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    const { data, isLoading, isError } = useGetPlanQuery(user);
    const columns: GridColumns = [
        {
            field: "Id",
            headerName: "ID",
            width: 90
        },
        {
            field: "FashionId",
            headerName: "Fashion ID",
            width: 100
        },
        {
            field: "PlanCount",
            headerName: "Plan Count",
            width: 100
        }
    ];

    return <TableWrapper data={data} isError={isError} isLoading={isLoading} columns={columns} />;
};

export default PlanTable;
