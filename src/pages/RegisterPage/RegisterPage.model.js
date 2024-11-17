import * as yup from "yup"


export const schemaSignUp = yup
    .object({
        username: yup.string()
            .min(3, "Имя должно содержать не менее 3 символов")
            .max(20, "Имя должно содержать не более 20 символом")
            .required("Имя пользователя обязательно"),
        email: yup.string()
            .email("Неверный формат электронной почты")
            .required("Электронная почта обязательно"),
        password: yup.string()
            .min(6, "Пароль должен содержать не менее 6 символов")
            .max(40, "Пароль должен содержать не более 40 символов"),
        confirmPassword: yup
            .string()
            .required('Подтверждение пароля обязательно')
            .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
        agreeToTerms: yup.bool().oneOf([true], 'Необходимо согласие'),
    });
