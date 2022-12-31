import { User } from "../utils/types/user.types";

export const EMPTY_USER: User = {
    userName: "",
    password: ""
};

export enum Tables {
    NORMA = "NormaTable",
    RAW = "RawTable",
    PRODUCT = "ProductTable",
    FASHION = "FashionTable",
    PLAN = "PlanTable",
    FORMATTED_NORMA = "FormattedNormaTable"
}

export enum Queries {
    INSERT = "INSERT",
    UPDATE = "UPDATE",
    DELETE = "DELETE"
}
