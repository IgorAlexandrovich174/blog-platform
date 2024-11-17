import {AppBar, Box, Button, Link, Toolbar, Typography} from "@mui/material";
import styles from "./Header.module.scss"
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleTitleClick = () => {
        navigate("/");
    }

    const handleSignUpClick = () => {
        navigate("/sign-up");
    }

    const handleSignInClick = () => {
        navigate("/sign-in");
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
                    <Box>
                        <Link>
                            <Button variant="contained" color="inherit" className={styles["sign-in-button"]} onClick={handleSignInClick}>
                                Sign In
                            </Button>
                        </Link>
                        <Link>
                            <Button variant="outlined" className={styles["sign-up-button"]} onClick={handleSignUpClick}>
                                Sign Up
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};