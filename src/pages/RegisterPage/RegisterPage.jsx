import React, {useEffect} from 'react';
import {Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useRegisterUserMutation} from "../../articlesApi/articlesApi.js";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaSignUp} from "./RegisterPage.model.js";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [registerUser, {isSuccess, isError, error}] = useRegisterUserMutation();
    const {handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
        resolver: yupResolver(schemaSignUp),
    });

    const onSubmit = async (data) => {
        const result = {
            user : {
                username: data.username,
                email: data.email,
                password: data.password,
            },
        };
        await registerUser(result);
    }

    useEffect(() => {
        if (isSuccess) navigate('/sign-in');
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
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: "400px",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    textAlign="center"
                    sx={{marginBottom: "16px"}}
                >
                    Create new account
                </Typography>

                <Controller
                    name="username"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Username"
                            name="username"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.username)}
                            helperText={errors.username?.message}
                        />
                    )
                    }
                />
                <Controller
                    name="email"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Email address"
                            name="email"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                    )
                    }
                />

                <Controller
                    name="password"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Password"
                            name="password"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                    )
                    }
                />

                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => (
                        <TextField
                            {...field}
                            label="Repeat Password"
                            name="confirmPassword"
                            fullWidth
                            margin="normal"
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword?.message}
                        />
                    )
                    }
                />
                <div style={{height: 2, background: "#E8E8E8", marginTop: 30}}></div>
                <FormControlLabel
                    control={
                        <Controller
                            name="agreeToTerms"
                            control={control}
                            render={({field}) =>
                                <Checkbox name="agreeToTerms" {...field} required />}/>
                    }
                    label="I agree to the processing of my personal information"
                    sx={{color: "#595959", mt: "16px"}}
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
                    Create
                </Button>

                <Typography variant="body2" textAlign="center" sx={{marginTop: "16px", color: "grey"}}>
                    Already have an account?{" "}
                    <Button
                        variant="text"
                        sx={{
                            padding: "0",
                            textTransform: "none",
                            color: "#007bff",
                            ":hover": {textDecoration: "underline"},
                        }}
                        onClick={() => {
                            navigate("/sign-in")
                        }}
                    >
                        Sign In
                    </Button>
                </Typography>
            </Box>
        </Box>
    );
}

