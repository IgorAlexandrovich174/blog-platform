import React, {useState} from 'react';
import {useLikeArticleMutation} from "../../articlesApi/articlesApi.js";
import {Box, IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

const Likes = ({ count, slug }) => {
    const [likeArticle, {data: updatedArticle}] = useLikeArticleMutation();
    const [like, setlike] = useState(false);


    const handleLikeClick = async () => {
        await likeArticle(slug);
        setlike(!like);
    };

    return (
        <Box display="flex" alignItems="center">
            <IconButton
                color={like ? "error" : "default"}
                onClick={handleLikeClick}
            >
                {like ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Box ml={1}>{count}</Box>
        </Box>
    );
};

export default Likes;