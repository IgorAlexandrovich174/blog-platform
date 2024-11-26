import React, {useEffect} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreateNewArticleMutation} from "../../articlesApi/articlesApi.js";
import {schemaNewArticle} from "./ArticleForm.model.js";
import {useNavigate} from "react-router-dom";

const ArticleForm = ({ submit, article }) => {
    const navigate = useNavigate();
    const [{ isSuccess }] = useCreateNewArticleMutation();

    const {control, handleSubmit, reset, formState: {errors},} = useForm({
        defaultValues: {
            title: "",
            description: "",
            body: "",
            tagList: [],
        },
        resolver: yupResolver(schemaNewArticle),
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "tagList",
    });

    useEffect(() => {
        if (isSuccess) {
            navigate("/", {replace: true})
        }
    }, [isSuccess]);

    useEffect(() => {
        if (article) {
            reset(article);
        }
    }, []);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submit)}
            sx={{
                display: "flex",
                flexDirection: "column",

                gap: 3,
                maxWidth: 800,
                mx: "auto",
                p: 4,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                background: "#ffffff",
            }}
        >
            <Typography variant="h5" textAlign="center">
                {article ? "Edit article" : "Create new article"}
            </Typography>

            <Controller
                name="title"
                control={control}
                render={({field}) => (
                    <TextField {...field} label="Title"
                               variant="outlined"
                               fullWidth
                               error={Boolean(errors.title)}
                               helperText={errors.title?.message}
                               color={errors.title ? 'error' : 'primary'}/>
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Short Description"
                        variant="outlined"
                        fullWidth
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                        color={errors.description ? 'error' : 'primary'}
                    />
                )}
            />
            <Controller
                name="body"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        label="Text"
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        error={Boolean(errors.body)}
                        helperText={errors.body?.message}
                        color={errors.body ? 'error' : 'primary'}
                    />
                )}
            />

            <Box sx={{display: "flex", alignItems: "end"}}>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2}}>
                    {fields.map((field, index) => (
                        <Box
                            key={field.id}
                            sx={{display: "flex", alignItems: "center", gap: 2}}
                        >
                            <Controller
                                name={`tagList.${index}`}
                                control={control}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        label={`Tag ${index + 1}`}
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        sx={{width: '340px'}}
                                    />
                                )}

                            />
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => remove(index)}
                            >
                                Delete
                            </Button>
                        </Box>
                    ))}
                </Box>
                <Button
                    variant="outlined"
                    size="small"
                    sx={{
                        width: "130px", marginLeft: "10px",
                        marginBottom: "4px"
                    }}
                    onClick={() => append("")}
                >
                    Add Tag
                </Button>
            </Box>
            <Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{alignSelf: "center", width: "340px"}}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ArticleForm;
