import React from "react";
import AuthFrom from "./AuthFrom";

import { useAppSelector } from "../store/store";
import ContentPage from "./ContentPage";

const App = () => {
    const authState = useAppSelector((state) => state.userSlice.isAuthenticated);
    return authState ? <ContentPage /> : <AuthFrom />;
};

export default App;
