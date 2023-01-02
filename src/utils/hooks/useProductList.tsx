import { useState } from "react";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useGetProductListQuery } from "../../store/api/TablesApi";
import { User } from "../types/user.types";
import ErrorAlert from "../../components/ErrorAlert";

export const useProductList = (user: User) => {
    const [open, setOpen] = useState(false);
    const { data, isLoading, isError } = useGetProductListQuery(user);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const productModal = () => {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Список продуктів</DialogTitle>
                <DialogContent>
                    <Typography>Список продуктів, які наразі є у базі даних:</Typography>
                    {isLoading && <CircularProgress />}
                    {isError && <ErrorAlert />}
                    {data && <Typography>{data}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Закрити
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return {
        productListModal: productModal,
        handleClickOpenProductList: handleClickOpen
    };
};
