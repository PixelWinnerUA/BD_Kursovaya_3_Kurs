import { ModalsProps } from "../types/tables.types";
import { useState } from "react";
import { Tables } from "../../constans/constans";
import * as yup from "yup";
import { getValidationSchema } from "../helpers/getValidationSchema";
import { useFormik } from "formik";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FieldsWrapper } from "../../components/styled/FieldsWrapper";
import { User } from "../types/user.types";
import { useUpdateTableMutation } from "../../store/api/TablesApi";

export type UpdateMutationProps = {
    tableType: Tables;
    user: User;
    values: object;
};

export const useUpdate = ({ tableType, user }: ModalsProps) => {
    const [open, setOpen] = useState(false);
    const [updateTable, { isLoading }] = useUpdateTableMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let columns: string[] = [];

    switch (tableType) {
        case Tables.NORMA:
            columns = ["Id", "ProductId", "FashionId", "RawId", "CountOfRaw"];
            break;
        case Tables.RAW:
            columns = ["Id", "RawName", "Unit"];
            break;
        case Tables.PRODUCT:
            columns = ["Id", "ProductName"];
            break;
        case Tables.PLAN:
            columns = ["Id", "FashionId", "PlanCount"];
            break;
        case Tables.FASHION:
            columns = ["Id", "FashionId"];
            break;
    }

    const values = columns.reduce((obj, key) => ({ ...obj, [key]: "" }), {});

    const schema = yup.object().shape(
        columns.reduce(
            (obj, key) => ({
                ...obj,
                [key]: getValidationSchema(key)
            }),
            {}
        )
    );

    const handleSubmit = (values: object) => {
        const body = { tableType, user: { ...user }, values: { ...values } } as UpdateMutationProps;
        handleClose();
        updateTable(body);
    };

    const formik = useFormik({
        initialValues: { ...values },
        validationSchema: schema,
        onSubmit: (values) => handleSubmit(values)
    });

    const updateModal = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Оновленнярядку</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заповніть усі поля, щоб оновити певний рядок, введіть його Id.
                    </DialogContentText>
                    <FieldsWrapper>
                        {columns.map((column) => {
                            return (
                                <TextField
                                    key={column}
                                    id={column}
                                    label={column}
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    // @ts-ignore
                                    value={formik.values[column]}
                                    // @ts-ignore
                                    error={formik.touched[column] && Boolean(formik.errors[column])}
                                    // @ts-ignore
                                    helperText={formik.touched[column] && formik.errors[column]}
                                />
                            );
                        })}
                    </FieldsWrapper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Назад
                    </Button>
                    <Button onClick={formik.submitForm} disabled={isLoading} variant="contained">
                        Оновити рядок
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return {
        updateModal,
        handleClickOpenUpdate: handleClickOpen
    };
};
