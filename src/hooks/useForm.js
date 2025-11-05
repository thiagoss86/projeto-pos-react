import { set } from "mongoose";
import { useState } from "react";

export const useForm = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues);

    const register = (name) => ({
        name,
        value: values[name] || "",
        onChange: (e) => {
            const { name, value } = e.target;
            setValues((prevValues) => ({ ...prevValues, [name]: value }));
        },
    });

    const setAll = (next) => setValues((prev) => ({ ...prev, ...next }));
    const reset = () => setValues(initialValues);

    return { register, values };
};
