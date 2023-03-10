import { Tables } from "../../constans/constans";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useInsertTableMutation } from "../../store/api/TablesApi";
import { User } from "../types/user.types";
import { getValidationSchema } from "../helpers/getValidationSchema";
import { ModalsProps } from "../types/tables.types";
import { FieldsWrapper } from "../../components/styled/FieldsWrapper";

export type InsertMutationProps = {
    tableType: Tables;
    user: User;
    values: object;
};

export const useInsert = ({ tableType, user }: ModalsProps) => {
    const [open, setOpen] = useState(false);
    const [insertTable, { isLoading }] = useInsertTableMutation();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let columns = [] as string[];

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
        const body = { tableType, user: { ...user }, values: { ...values } } as InsertMutationProps;
        handleClose();
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
                <DialogTitle>?????????????????? ??????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>?????????????????? ?????? ????????, ?????? ???????????? ???????? ???????????????? ???? ??????????????.</DialogContentText>
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
                        ??????????
                    </Button>
                    <Button onClick={formik.submitForm} disabled={isLoading} variant="contained">
                        ???????????? ??????????
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
