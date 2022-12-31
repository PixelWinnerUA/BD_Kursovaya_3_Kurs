import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        authUser: builder.mutation({
            query: (body) => ({
                url: "php/connectDB.php",
                method: "POST",
                body
            }),
        }),
    }),
})

export const {useAuthUserMutation} = userApi;