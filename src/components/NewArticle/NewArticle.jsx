import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useCreateNewArticleMutation} from "../../articlesApi/articlesApi.js";
import ArticleForm from "../ArticleForm/ArticleForm.jsx";

const NewArticle = () => {
    const navigate = useNavigate();
    const [createArticle, { isSuccess }] = useCreateNewArticleMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/", { replace: true });
        }
    }, [isSuccess]);

    const submit = async (data) => {
        await createArticle({ article: data }).unwrap();
    };

    return (
        <>
            <ArticleForm submit={submit} />
        </>
    );
};

export default NewArticle;