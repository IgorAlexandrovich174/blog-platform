import React, {useEffect} from 'react';
import {Avatar, Box, Button, Link, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import styles from "./ArticleHeader.module.scss/"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useLocation, useNavigate} from "react-router-dom";
import {useDeleteArticleMutation, useFetchCurrentUserQuery} from "../../articlesApi/articlesApi.js";
import {Popconfirm} from "antd";
import Likes from "../Likes/Likes.jsx";

export default function ArticleHeader({article}) {
    const navigate = useNavigate();
    const {data} = useFetchCurrentUserQuery();
    const location = useLocation();
    const isArticlePage = location.pathname === `/articles/${article?.slug}`;
    const isLogged = () => article?.author?.username === data?.user?.username;
    const [deleteArticle, {isSuccess}] = useDeleteArticleMutation();

    const handleTitleClick = () => {
        navigate(`/articles/${article.slug}`);
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess]);
    return (
        <>
            <Box className={styles["article-header"]}>
                <Box className={styles["article-title"]} sx={{display: "flex",
                    alignItems: "center"}}>
                    <Link variant="h6" underline="none" onClick={handleTitleClick}>
                        {article?.title}
                    </Link>
                    <Stack direction="row" alignItems="center"
                           className={styles["like-container"]}>

                        <Likes count={article?.favoritesCount} slug={article?.slug} />
                    </Stack>
                </Box>
                <Stack direction="row" spacing={1} className={styles["tags"]}>
                    <List sx={{display: 'flex', gap: '8px'}}>
                        {article?.tagList.map(
                            (tag, index) =>
                                tag && (
                                    <ListItem
                                        key={tag + `${index}`}
                                        sx={{
                                            height: '20px',
                                            border: '1px solid #000',
                                            borderRadius: '2px',
                                            width: 'auto',
                                            fontSize: '12px',
                                            paddingInline: '5px',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <ListItemText>{tag}</ListItemText>
                                    </ListItem>
                                ),
                        )}
                    </List>
                </Stack>
                <Typography variant="body2" className={styles["description"]}>
                    {article?.description}
                </Typography>
            </Box>
            <Box className={styles["author-container"]} sx={{display: "flex", flexDirection: "column", gap: "5px"}}>
                <Stack direction="row-reverse" alignItems="center"
                       className={styles["author-details"]}>
                    <Avatar className={styles["avatar"]} src={article?.author?.image}/>
                    <Stack
                        direction="column"
                        width={100}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Link variant="body2" className={styles["author-name"]} underline="none">
                            {article?.author?.username}
                        </Link>
                        <Typography variant="caption" className={styles["date"]}>
                            {new Date(article?.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Stack>
                </Stack>
                {isArticlePage && isLogged() && (
                    <Box
                        sx={{display: "flex", gap: "10px"}}>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this article?"
                            onConfirm={async () => await deleteArticle(article.slug).unwrap()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                // onClick={async () => await deleteArticle(article.slug).unwrap()}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={() => navigate(`/articles/${article.slug}/edit`)}
                        >
                            Edit
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
}

