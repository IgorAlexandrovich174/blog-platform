import React, { useState } from 'react';
import {Box, Pagination, Container} from '@mui/material';
import styles from './Main.module.scss';

import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import {useFetchArticlesQuery} from "../../articlesApi/articlesApi.js";


export default function Main() {
    const [page, setPage] = useState(1);
    const {data, error, isLoading} = useFetchArticlesQuery(page);

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    return (
        <Box sx={{bgcolor: "#EBEEF3"}}>
                <Container className={styles["container"]}>
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        {data.map((article) => (
                            <ArticleCard article={article} key={article.slug}/>
                        ))}
                    </Box>
                    <Box className={styles["pagination"]}>
                        <Pagination count={5} color="primary" shape="rounded" onChange={handlePageChange} page={page}/>
                    </Box>
                </Container>
        </Box>
    );
}
