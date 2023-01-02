import * as yup from "yup";

export const getValidationSchema = (key: string) => {
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

const isFloat = (key: string): boolean => {
    return key === "CountOfRaw";
};

const isNumberKey = (key: string): boolean => {
    return key === "ProductId" || key === "RawId" || key === "PlanCount";
};
