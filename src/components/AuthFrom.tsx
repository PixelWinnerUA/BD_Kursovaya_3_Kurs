import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "styled-components";
import * as yup from "yup";
import { useFormik } from "formik";
import { useAuthUserMutation } from "../store/api/UserApi";
import { useAppDispatch } from "../store/store";
import { User } from "../utils/types/user.types";
import { resetUser, setUser } from "../store/reducers/UserReducer";

const AuthGrid = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 20px;
    width: fit-content;
    height: fit-content;
    padding: 20px;
    margin: auto;
    border: 1px solid gray;
    border-radius: 4px;
    background: #f6f6f6;
`;

const StyledButton = styled(Button)`
    align-self: center;
    width: fit-content;
`;

const AuthFrom = () => {
    const [getUsers, { isLoading, isSuccess }] = useAuthUserMutation();
    const dispatch = useAppDispatch();

    const schema = yup.object().shape({
        userName: yup.string().required("Необхідно ввести логін!"),
        password: yup.string().required("Необхідно ввести пароль!")
    });

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        } as User,
        validationSchema: schema,
        onSubmit: (values) => {
            getUsers(values);
        }
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(formik.values));
        } else {
            dispatch(resetUser());
        }
    }, [isSuccess]);

    return (
        <AuthGrid>
            <Typography variant="h5">Авторизація</Typography>

            <TextField
                id="userName"
                label="Логін"
                variant="outlined"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
            />

            <TextField
                id="password"
                label="Пароль"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <StyledButton variant="contained" onClick={formik.submitForm} disabled={isLoading}>
                Увійти
            </StyledButton>
        </AuthGrid>
    );
};

export default AuthFrom;
