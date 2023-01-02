import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/UserReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "./api/UserApi";
import { tablesApi } from "./api/TablesApi";

export const store = configureStore({
    reducer: {
        userSlice: userSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [tablesApi.reducerPath]: tablesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, tablesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
