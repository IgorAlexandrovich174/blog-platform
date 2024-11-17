import * as yup from "yup";

export const schemaLoginPage = yup.object().shape({
    email: yup
        .string()
        .email('Неверный формат электронной почты')
        .required('Электронная почта обязательна'),
    password: yup
        .string()
        .required('Пароль обязателен')
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .max(40, 'Пароль должен содержать не более 40 символов'),
});