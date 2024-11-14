import React from 'react';
import styles from "../ArticleCard/ArticaleCard.module.scss";
import {Box, Card} from "@mui/material";
import ArticleHeader from "../ArticleHeader/ArticleHeader.jsx";
import Markdown from "react-markdown";

export default function ArticleCard({ article, isFullPage = false }) {
    return (
        <Card sx={{p: 1, m: 1}} key={article?.slug} className={styles["article-card"]}>
            <Box sx={{display: "flex", justifyContent: "space-between" }}>
                <ArticleHeader className={styles["article-header"]} article={article}/>
            </Box>
            {isFullPage && (
                <Markdown className={styles["markdown"]}>{article?.body}</Markdown>
            )}
        </Card>
    );
}
