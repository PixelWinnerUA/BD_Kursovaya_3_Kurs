import { Tables } from "../../constans/constans";
import { User } from "./user.types";

export interface NormaTable {
    Id: number;
    ProductId: number;
    FashionId: string;
    RawId: number;
    CountOfRaw: number;
}

export interface RawTable {
    Id: number;
    RawName: string;
    Unit: string;
}

export interface ProductTable {
    Id: number;
    ProductName: string;
}

export interface FashionTable {
    Id: string;
}

export interface PlanTable {
    Id: number;
    FashionId: string;
    PlanCount: number;
}

export interface FormattedNormaTable {
    Id: number;
    ProductName: string;
    FashionId: string;
    RawName: string;
    CountOfRaw: number;
    Unit: string;
}

export type ModalsProps = {
    tableType: Tables;
    user: User;
};
