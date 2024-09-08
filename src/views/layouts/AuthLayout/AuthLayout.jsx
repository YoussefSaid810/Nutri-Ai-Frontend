import React, { useEffect } from "react";
import { Fragment } from "react";
import "./AuthLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "views/partials/Loading/Loading";

const AuthLayout = () => {
    const nav = useNavigate();
    const loadingState = useSelector((store) => store.loading);
    const USER = useSelector((store) => store.user);

    useEffect(() => {
        if (USER && localStorage.getItem("user")) nav("/profile");
    }, [USER]);

    return (
        <Fragment>
            <main className="auth">
                <Loading LoadState={loadingState} />

                <section className="innerContainer">
                    <Outlet />
                </section>
            </main>
        </Fragment>
    );
};

export default AuthLayout;
