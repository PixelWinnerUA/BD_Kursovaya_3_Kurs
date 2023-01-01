import { Tables } from "../../constans/constans";
import { useState } from "react";
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
import * as yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useInsertTableMutation } from "../../store/api/TablesApi";
import { User } from "../types/user.types";

type UseInsertProps = {
    tableType: Tables;
    user: User;
};

export type InsertMutationProps = {
    tableType: Tables;
    user: User;
    values: object;
};

const FieldsWrapper = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
`;

export const useInsert = ({ tableType, user }: UseInsertProps) => {
    const [open, setOpen] = useState(false);
    const [insertTable, { isLoading }] = useInsertTableMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let columns: string[] = [];

    switch (tableType) {
        case Tables.NORMA:
            columns = ["ProductId", "FashionId", "RawId", "CountOfRaw"];
            break;
        case Tables.RAW:
            columns = ["RawName", "Unit"];
            break;
        case Tables.PRODUCT:
            columns = ["ProductName"];
            break;
        case Tables.PLAN:
            columns = ["FashionId", "PlanCount"];
            break;
        case Tables.FASHION:
            columns = ["FashionId"];
            break;
    }

    //Creating obj with empty values for a keys
    const values = columns.reduce((obj, key) => ({ ...obj, [key]: "" }), {});

    const isNumberKey = (key: string): boolean => {
        return key === "ProductId" || key === "RawId" || key === "PlanCount";
    };
    const isFloat = (key: string): boolean => {
        return key === "CountOfRaw";
    };

    const getValidationSchema = (key: string) => {
        if (isNumberKey(key)) {
            return yup
                .number()
                .integer("Тип цієї колонки integer!")
                .min(0, "Не може бути меншим за нуль!")
                .required("Не може бути порожнім!");
        } else if (isFloat(key)) {
            return yup.number().required("Не може бути порожнім!");
        }

        return yup.string().required("Не може бути порожнім!");
    };
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
        const body = { tableType, user: { ...user }, values: { ...values } };
        handleClose();
        console.log(body);
        insertTable(body);
    };

    const formik = useFormik({
        initialValues: { ...values },
        validationSchema: schema,
        onSubmit: (values) => handleSubmit(values)
    });

    const insertModal = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Додавання рядку</DialogTitle>
                <DialogContent>
                    <DialogContentText>Заповніть усі поля, щоб додати нове значення до таблиці.</DialogContentText>
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
                        Додати рядок
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return {
        insertModal,
        handleClickOpenInsert: handleClickOpen
    };
};
