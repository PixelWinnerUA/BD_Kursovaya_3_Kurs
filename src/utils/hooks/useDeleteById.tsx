import { Tables } from "../../constans/constans";
import { User } from "../types/user.types";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import styled from "styled-components";
import { useDeleteByIdMutation } from "../../store/api/TablesApi";

type UseDeleteByIdProps = {
    tableType: Tables;
    user: User;
};

export type UseDeleteByIdMutationProps = {
    tableType: Tables;
    user: User;
    Id: string;
};

const FieldWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`;

export const useDeleteById = ({ tableType, user }: UseDeleteByIdProps) => {
    const [open, setOpen] = useState(false);
    const [deleteById, { isLoading }] = useDeleteByIdMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const schema = yup.object().shape({ Id: yup.string().required("Не може бути порожнім!") });

    const handleSubmit = (Id: string) => {
        const body = { tableType, user: { ...user }, Id } as UseDeleteByIdMutationProps;
        handleClose();
        deleteById(body);
        console.log(body);
    };

    const formik = useFormik({
        initialValues: { Id: "" },
        validationSchema: schema,
        onSubmit: (values) => handleSubmit(values.Id)
    });

    const deleteModal = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Видалення рядку за Id</DialogTitle>
                <DialogContent>
                    <DialogContentText>Введіть Id рядку, який потрібно видалити.</DialogContentText>
                    <FieldWrapper>
                        <TextField
                            id="Id"
                            label="Id"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.Id}
                            error={formik.touched.Id && Boolean(formik.errors.Id)}
                            helperText={formik.touched.Id && formik.errors.Id}
                        />
                    </FieldWrapper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Назад
                    </Button>
                    <Button onClick={formik.submitForm} disabled={isLoading} variant="contained">
                        Видалити рядок
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return {
        deleteModal,
        handleClickOpenDelete: handleClickOpen
    };
};
