import React from 'react';
import {Avatar, Box, Chip, Link, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import styles from "./ArticleHeader.module.scss/"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";

export default function ArticleHeader({ article }) {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate(`/articles/${article.slug}`);
    }
    return (
        <>
            <Box className={styles["article-header"]}>
                <Box className={styles["article-title"]}>
                    <Link variant="h6" underline="none" onClick={handleTitleClick}>
                        {article?.title}
                    </Link>
                    <Stack direction="row" alignItems="center"
                           className={styles["like-container"]}>
                        <FavoriteBorderIcon fontSize="small"/>
                        <Typography variant="body2">{article?.favoritesCount}</Typography>

                    </Stack>
                </Box>
                <Stack direction="row" spacing={1} className={styles["tags"]}>
                    <List sx={{ display: 'flex', gap: '8px' }}>
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
            <Box className={styles["author-container"]}>
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
            </Box>
        </>
    );
}

