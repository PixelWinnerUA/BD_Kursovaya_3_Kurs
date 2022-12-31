import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FashionTable, NormaTable, PlanTable, ProductTable, RawTable } from "../../utils/types/tables.types";

export interface TablesState {
    normaTable: NormaTable[] | null;
    rawTable: RawTable[] | null;
    productTable: ProductTable[] | null;
    fashionTable: FashionTable[] | null;
    planTable: PlanTable[] | null;
}

const initialState = {
    normaTable: null,
    rawTable: null,
    productTable: null,
    fashionTable: null
} as TablesState;

export const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        setNormaTable: (state, action: PayloadAction<NormaTable[]>) => {
            state.normaTable = action.payload;
        },
        setRawTable: (state, action: PayloadAction<RawTable[]>) => {
            state.rawTable = action.payload;
        },
        setProductTable: (state, action: PayloadAction<ProductTable[]>) => {
            state.productTable = action.payload;
        },
        setFashionTable: (state, action: PayloadAction<FashionTable[]>) => {
            state.fashionTable = action.payload;
        },
        setPlanTable: (state, action: PayloadAction<PlanTable[]>) => {
            state.planTable = action.payload;
        }
    }
});

export const { setNormaTable, setProductTable, setRawTable, setFashionTable } = tablesSlice.actions;
export default tablesSlice.reducer;
