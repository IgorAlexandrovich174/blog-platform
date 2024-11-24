import React, {useEffect} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {useFetchCurrentUserQuery, useUpdateUserProfileMutation} from "../../articlesApi/articlesApi.js";
import {Controller, useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaEditProfilePage} from "./EditProfilePage.model.jsx";
import {useNavigate} from "react-router-dom";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const {data: userData} = useFetchCurrentUserQuery();
    const [updateUserProfile, { isSuccess}] = useUpdateUserProfileMutation();
    const {control, handleSubmit, formState: { errors},} = useForm({
        defaultValues: {
            userName: userData?.user?.userName || '',
            emailAddress: userData?.user?.email || '',
            password: '',
            image: userData?.user?.image || '',
        },
        resolver: yupResolver(schemaEditProfilePage),
    })

    const onSubmit = async (formData) => {
        await updateUserProfile({
            user: {
                username: formData.userName,
                email: formData.emailAddress,
                password: formData.password,
                image: formData.image || null,
            }
        }).unwrap();
        console.log(isSuccess);
        console.log(formData)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                width: "100%",
                maxWidth: "400px",
                margin: "auto",
                padding: "20px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                backgroundColor: "#fff",
            }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography
                variant="h5"
                component="h1"
                sx={{marginBottom: 3, fontWeight: "bold"}}
            >
                Edit Profile
            </Typography>
            <Controller
                name="userName"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Username"
                        variant="outlined"
                        error={Boolean(errors.userName)}
                        helperText={errors.userName?.message}
                    />
                )}
            />
            <Controller
                name="emailAddress"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Email address"
                        variant="outlined"
                        error={Boolean(errors.emailAddress)}
                        helperText={errors.emailAddress?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="New password"
                        type="password"
                        variant="outlined"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Controller
                name="image"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        label="Avatar image (url)"
                        variant="outlined"
                        error={Boolean(errors.image)}
                        helperText={errors.image?.message}
                    />
                )}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                    width: "100%",
                    height: "50px",
                    marginTop: 2,
                    fontSize: "16px",
                    fontWeight: "bold",
                    textTransform: "none",
                }}
            >
                Save
            </Button>
        </Box>
    );
};

export default EditProfilePage;