import React, {useState} from 'react';
import {useLikeArticleMutation} from "../../articlesApi/articlesApi.js";
import {Box, IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

const Likes = ({ count, slug }) => {
    const [likeArticle, {isSuccess}] = useLikeArticleMutation();

    const handleLikeClick = async () => {
        await likeArticle(slug);
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                color={isSuccess ? "error" : "default"}
                onClick={handleLikeClick}
            >
                {isSuccess ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Box ml={1}>{count}</Box>
        </Box>
    );
};

export default Likes;