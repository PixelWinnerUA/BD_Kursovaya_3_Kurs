import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types/user.types";
import { EMPTY_USER } from "../../constans/constans";

export interface UserState {
    user: User;
    isAuthenticated: boolean;
}

const initialState = {
    user: {
        userName: "",
        password: ""
    },
    isAuthenticated: false
} as UserState;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = { ...action.payload };
            state.isAuthenticated = true;
        },
        resetUser: (state) => {
            state.user = EMPTY_USER;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
