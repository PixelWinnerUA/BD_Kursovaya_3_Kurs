import React, { useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography
} from "@mui/material";
import styled from "styled-components";
import { Tables } from "../constans/constans";
import NormaTable from "./tables/normaTable";
import RawTable from "./tables/rawTable";
import FashionTable from "./tables/fashionTable";
import ProductTable from "./tables/productTable";
import PlanTable from "./tables/planTable";
import FormattedNormaTable from "./tables/formattedNormaTable";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useAvatarHook } from "../utils/hooks/useAvatar.hook";
import { resetUser } from "../store/reducers/UserReducer";
import { useInsert } from "../utils/hooks/useInsert.hook";
import { useDeleteById } from "../utils/hooks/useDeleteById";
import { useUpdate } from "../utils/hooks/useUpdate";
import { useProductList } from "../utils/hooks/useProductList";

const ContentPageBox = styled(Box)`
    width: 100%;
    height: 100%;
`;

const ContentPageContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 60px);
`;

const Header = styled(AppBar)`
    height: 60px;

    && {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        background-color: lightgrey;
    }
`;

const BtsContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 0 10px;
`;

const ContentPage = () => {
    const [table, setTable] = useState<Tables>(Tables.FORMATTED_NORMA);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const user = useAppSelector((state) => state.userSlice.user);
    const dispatch = useAppDispatch();
    const { avatarProps } = useAvatarHook(user.userName);
    const { handleClickOpenInsert, insertModal } = useInsert({ tableType: table, user });
    const { handleClickOpenDelete, deleteModal } = useDeleteById({ tableType: table, user });
    const { handleClickOpenUpdate, updateModal } = useUpdate({ tableType: table, user });
    const { handleClickOpenProductList, productListModal } = useProductList(user);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        handleCloseUserMenu();
        dispatch(resetUser());
    };

    const handleChange = (event: SelectChangeEvent) => {
        setTable(event.target.value as Tables);
    };

    const renderTable = () => {
        switch (table) {
            case Tables.NORMA:
                return <NormaTable />;
            case Tables.RAW:
                return <RawTable />;
            case Tables.PRODUCT:
                return <ProductTable />;
            case Tables.FASHION:
                return <FashionTable />;
            case Tables.PLAN:
                return <PlanTable />;
            case Tables.FORMATTED_NORMA:
                return <FormattedNormaTable />;
        }
    };

    const isViewOfTable = table === Tables.FORMATTED_NORMA;

    return (
        <ContentPageBox>
            <Header position="sticky">
                <Select value={table} onChange={handleChange} size="small">
                    <MenuItem value={Tables.FORMATTED_NORMA}>Таблиця: Norma (Форматована)</MenuItem>
                    <MenuItem value={Tables.NORMA}>Таблиця: Norma</MenuItem>
                    <MenuItem value={Tables.RAW}>Таблиця: Raw</MenuItem>
                    <MenuItem value={Tables.PLAN}>Таблиця: Plan</MenuItem>
                    <MenuItem value={Tables.PRODUCT}>Таблиця: Product</MenuItem>
                    <MenuItem value={Tables.FASHION}>Таблиця: Fashion</MenuItem>
                </Select>
                <BtsContainer>
                    <Button disabled={isViewOfTable} onClick={handleClickOpenInsert} variant="contained">
                        Додати
                    </Button>
                    <Button disabled={isViewOfTable} onClick={handleClickOpenUpdate} variant="contained">
                        Оновити
                    </Button>
                    <Button disabled={isViewOfTable} onClick={handleClickOpenDelete} variant="contained">
                        Видалити
                    </Button>
                    <Button onClick={handleClickOpenProductList} variant="contained">
                        Список продуктів
                    </Button>
                </BtsContainer>
                <Tooltip title={`Користувач: ${user.userName}`}>
                    <Avatar {...avatarProps} onClick={handleOpenUserMenu} />
                </Tooltip>
                <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem>
                        <Typography fontWeight={600} textAlign="center">
                            Користувач: {user.userName}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                        <Typography textAlign="center">Вийти</Typography>
                    </MenuItem>
                </Menu>
            </Header>
            <ContentPageContainer>{renderTable()}</ContentPageContainer>
            {insertModal()}
            {updateModal()}
            {deleteModal()}
            {productListModal()}
        </ContentPageBox>
    );
};

export default ContentPage;
