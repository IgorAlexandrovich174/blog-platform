import React from 'react';
import {Box, Button, Card, Chip, TextField, Typography} from "@mui/material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {schemaNewArticle} from "./NewArticle.model.jsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreateNewArticleMutation} from "../../articlesApi/articlesApi.js";

const NewArticle = () => {
    const {createNewArticleMutation} = useCreateNewArticleMutation();
    const {control, handleSubmit} = useForm({
        defaultValues: {
            title: "",
            description: "",
            body: "",
            tagArray: [],
        },
        resolver: yupResolver(schemaNewArticle),
    });

    const {fields} = useFieldArray({control, name: "tags"});

    const onSubmit = async (formData) => {
        await createNewArticleMutation({
            article: formData,
        }).unwrap();
    }
    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                maxWidth: "900px",
                margin: "auto",
                padding: 3,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                background: "#FFFFFF",
            }}
        >
            <Typography variant="h5" textAlign="center">
                Create new article
            </Typography>
            <Controller
                name="title"
                control={control}
                render={({field}) => (
                    <TextField {...field} label="Title" variant="outlined" fullWidth/>
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({field}) => (
                    <TextField {...field} label="Short description" variant="outlined" fullWidth/>
                )}
            />
            <Controller
                name="text"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Text"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                    />
                )}
            />
            <Box sx={{
                display: "flex",
                justifyContent: "start",
            }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "start",
                        gap: 1,
                        width: "100%",
                        flexDirection: "row",
                        marginBottom: "10px"

                    }}
                >
                    <TextField
                        label="Tag"
                        variant="outlined"
                        sx={{
                            width: "350px",
                        }}
                        size="small"
                    />
                    <Button
                        variant="outlined"
                        size="medium"
                        color="error"
                    >
                        Delete
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        color="primary"
                    >
                        Add tag
                    </Button>
                </Box>
            </Box>
            <Button
                variant="outlined"
                size="large"
                sx={{
                    width: "350px",
                    background: "#007bff",
                    color: "#FFF",
                    "hover" : {background: "#0056b3"}
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default NewArticle;