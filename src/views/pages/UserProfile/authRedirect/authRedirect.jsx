import React, { useEffect } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
    const nav = useNavigate();
    useEffect(() => {
        nav("/profile/account");
    });
    return (
        <Fragment>
            <h1>You Shouldn't be here</h1>
        </Fragment>
    );
};

export default AuthRedirect;
