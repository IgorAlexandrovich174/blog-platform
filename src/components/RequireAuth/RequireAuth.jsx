import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token = useSelector((state) => state.auth.token);
    if (!token) {
        return <Navigate to={"/sign-in"} state={{from: location}} />
    }
    return children;
};

export default RequireAuth;