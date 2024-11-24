import {AppBar, Avatar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import styles from "./Header.module.scss"
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useFetchCurrentUserQuery} from "../../articlesApi/articlesApi.js";
import {logOut} from "../../authSlice/authSlice.js";

export default function Header() {
    const navigate = useNavigate();
    const jwt = useSelector((state) => state.auth.token);
    const { data } = useFetchCurrentUserQuery();
    const dispatch = useDispatch();

    const handleTitleClick = () => {
        navigate("/");
    }

    const handleSignUpClick = () => {
        navigate("/sign-up");
    }

    const handleSignInClick = () => {
        navigate("/sign-in");
    }

    const handleLogOut = () => {
        dispatch(logOut());
        localStorage.removeItem('token');
    }

    const handleProfileClick = () => {
        navigate("/profile");
    }

    return (
        <Box
            className={styles["header"]}>
            <AppBar className={styles["app-bar"]}>
                <Toolbar className={styles["toolbar"]} disableGutters>
                    <Link to="/" underline={"none"}>
                        <Typography variant="h6" className={styles["title"]} onClick={handleTitleClick}>
                            Realworld Blog
                        </Typography>
                    </Link>
                    {!jwt && (
                        <Box>
                            <Link>
                                <Button variant="contained" color="inherit" className={styles["sign-in-button"]}
                                        onClick={handleSignInClick}>
                                    Sign In
                                </Button>
                            </Link>
                            <Link>
                                <Button variant="outlined" className={styles["sign-up-button"]}
                                        onClick={handleSignUpClick}>
                                    Sign Up
                                </Button>
                            </Link>
                        </Box>
                    )}
                    {jwt && (
                        <Box>
                            <Button onClick={"/new-article"} className={styles['new-article']}>
                                Create article
                            </Button>
                            <Button onClick={handleProfileClick} className={styles.profile}>
                                {data?.user?.username}
                                <Avatar src={data?.user.image || './avatar.png'} sx={{ width: 46, height: 46 }} />
                            </Button>
                            <Button variant="logout" onClick={handleLogOut} style={{background: "black"}}>
                                Log Out
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};