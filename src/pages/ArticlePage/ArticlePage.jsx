import React from 'react';
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import {Container} from "@mui/material";

import {useParams} from "react-router-dom";
import {useFetchArticleBySlugQuery} from "../../articlesApi/articlesApi.js";

export default function ArticlePage() {
    const {slug} = useParams();
    const {data} = useFetchArticleBySlugQuery(slug);
    const article = data?.article;
    return (
        <Container className={"container"}>
            <ArticleCard article={article} isFullPage={true}/>
        </Container>
    );
}
