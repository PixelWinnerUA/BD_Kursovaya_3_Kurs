import React from "react";
import styled from "styled-components";
import { Box, CircularProgress } from "@mui/material";
import ErrorAlert from "./ErrorAlert";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import {
    NormaTable,
    RawTable,
    ProductTable,
    PlanTable,
    FashionTable,
    FormattedNormaTable
} from "../utils/types/tables.types";

const Wrapper = styled(Box)<{ $isExpanded?: boolean }>`
    width: ${({ $isExpanded }) => ($isExpanded ? `705px` : `500px`)};
    height: 371px;
`;

type TableWrapperProps = {
    isExpanded?: boolean;
    data?: NormaTable[] | RawTable[] | ProductTable[] | PlanTable[] | FashionTable[] | FormattedNormaTable[];
    isError: boolean;
    isLoading: boolean;
    columns: GridColumns;
};

const TableWrapper = ({ data, isError, isLoading, columns, isExpanded }: TableWrapperProps) => {
    if (isError) {
        return <ErrorAlert />;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Wrapper $isExpanded={isExpanded}>
            {data && (
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row.Id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            )}
        </Wrapper>
    );
};

export default TableWrapper;
