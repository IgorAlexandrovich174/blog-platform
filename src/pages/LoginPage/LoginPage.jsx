import React, {useEffect} from 'react';
import {Box, Button, TextField, Typography,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaLoginPage} from "./LoginPage.module.js";
import {useLoginMutation} from "../../articlesApi/articlesApi.js";
import {logIn} from "../../authSlice/authSlice.js";
import {useDispatch} from "react-redux";

export default function LoginPage() {
    const dispatch = useDispatch();
    const [login, {data: userData, isSuccess}] = useLoginMutation();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: {errors}} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schemaLoginPage),
    });

    const onSubmit = async (data) => {
        await login({user: data}).unwrap();
    }

    useEffect(()  => {
        if (isSuccess) {
            dispatch(logIn(userData.user.token));
            localStorage.setItem("token", userData.user.token);
            console.log(userData.user);
            navigate("/");
        }
    }, [isSuccess]);


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                component="form"
                sx={{
                    width: "400px",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
                onSubmit={handleSubmit(onSubmit)}
            >

                <Typography
                    variant="h5"
                    component="h1"
                    textAlign="center"
                    sx={{marginBottom: "16px"}}
                >
                    Sign In
                </Typography>


                <Controller
                    name="email"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        label="Email address"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                    />}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => <TextField
                        {...field}
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        padding: "12px",
                        fontWeight: "bold",
                        marginTop: "16px",
                        backgroundColor: "#007bff",
                        ":hover": {backgroundColor: "#0056b3"},
                        textTransform: "none",
                    }}
                >
                    Login
                </Button>
                <Typography variant="body2" textAlign="center" sx={{marginTop: "16px", color: "grey"}}>
                    Don’t have an account?
                    <Button
                        variant="text"
                        sx={{
                            padding: "0",
                            textTransform: "none",
                            color: "#007bff",
                            ":hover": {textDecoration: "underline"},
                        }}
                        onClick={() => {
                            navigate("/sign-up")
                        }}
                    >
                        Sign Up
                    </Button>
                </Typography>
            </Box>
        </Box>
    )
}
