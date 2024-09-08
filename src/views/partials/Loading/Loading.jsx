import React from "react";
import "./Loading.css";
import { useSelector } from "react-redux";

const Loading = ({ LoadState }) => {
    const loadingStore = useSelector((store) => store.loading);
    LoadState = LoadState ? LoadState : loadingStore;
    return (
        <div className={`LoadingCover ${LoadState ? "" : "hide"}`}>
            <div className="innerText">
                <span className="loader"></span>
            </div>
        </div>
    );
};

export default Loading;
