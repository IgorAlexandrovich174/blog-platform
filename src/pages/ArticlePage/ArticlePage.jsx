import React from 'react';
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ArticlePage() {
    const {slug} = useParams();
    const article = useSelector((state) => state.articles?.find((art) => art.slug === slug));
    console.log("Article", article);
    return (
        <Container className={"container"}>
            <ArticleCard article={article} isFullPage={true}/>
        </Container>
    );
}
