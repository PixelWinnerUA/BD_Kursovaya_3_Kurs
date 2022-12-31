import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../utils/types/user.types";
import {
    FashionTable,
    FormattedNormaTable,
    NormaTable,
    PlanTable,
    ProductTable,
    RawTable
} from "../../utils/types/tables.types";
import { Tables } from "../../constans/constans";
import { InsertMutationProps } from "../../utils/hooks/useInsert.hook";

export const tablesApi = createApi({
    reducerPath: "tablesApi",
    baseQuery: fetchBaseQuery(),
    tagTypes: [Tables.PLAN, Tables.RAW, Tables.FASHION, Tables.PRODUCT, Tables.NORMA, Tables.FORMATTED_NORMA],
    endpoints: (builder) => ({
        getNorma: builder.query<NormaTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getNorma.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.NORMA]
        }),
        getRaw: builder.query<RawTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getRaw.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.RAW]
        }),
        getProduct: builder.query<ProductTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getProduct.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.PRODUCT]
        }),
        getFashion: builder.query<FashionTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getFashion.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.FASHION]
        }),
        getPlan: builder.query<PlanTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getPlan.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.PLAN]
        }),
        getFormattedNorma: builder.query<FormattedNormaTable[] | undefined, User>({
            query: (body) => ({
                url: "php/getFormattedNorma.php",
                method: "POST",
                body
            }),
            providesTags: [Tables.FORMATTED_NORMA]
        }),

        insertTable: builder.mutation<Tables | undefined, InsertMutationProps>({
            query: (body) => ({
                url: `php/insertTable.php`,
                method: "POST",
                body
            }),
            invalidatesTags: (result: any) => [{ type: result }]
        })
    })
});

export const {
    useGetNormaQuery,
    useGetFashionQuery,
    useGetProductQuery,
    useGetRawQuery,
    useGetPlanQuery,
    useGetFormattedNormaQuery,
    useInsertTableMutation
} = tablesApi;
