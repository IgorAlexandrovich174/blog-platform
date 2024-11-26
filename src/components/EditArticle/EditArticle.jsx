import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetchArticleBySlugQuery, useUpdateArticleMutation} from "../../articlesApi/articlesApi.js";
import ArticleForm from "../ArticleForm/ArticleForm.jsx";

const EditArticle = () => {
    const { slug } = useParams();
    const { data } = useFetchArticleBySlugQuery(slug);
    const navigate = useNavigate();
    const [editArticle, { isSuccess}] = useUpdateArticleMutation();
    useEffect(() => {
        if (isSuccess) {
            navigate("/", { replace: true });
        }
    }, [isSuccess]);
    const submit = async (data) => {
        const { title, description, body, tagList } = data;
        const request = {
            article: {
                title,
                description,
                body,
                tagList,
            },
        };
        await editArticle({ body: request, slug }).unwrap();
    };

    return (
        <>
            <ArticleForm submit={submit} article={data?.article} />
        </>
    );
};

export default EditArticle;