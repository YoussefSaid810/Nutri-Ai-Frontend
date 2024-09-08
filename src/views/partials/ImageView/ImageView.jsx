import React, { useState } from "react";
import BrokenIMG from "../../../assets/Offline/imageNotFound.png";
import "./ImageView.css";
import { useDispatch } from "react-redux";
import { previewImage } from "store/Reducers/ImageReducer";

export const ImageView = ({
    src = "",
    alt = "placeholder image",
    className = "",
    preview = false,
    lazy = true,
}) => {
    const [err, setERR] = useState(false);
    const dispatch = useDispatch();
    src =
        src.startsWith("uploads") || src.startsWith("/uploads")
            ? process.env.REACT_APP_SERVER_IMG + "/" + src
            : src;
    return (
        <img
            src={!err ? src : BrokenIMG}
            alt={alt}
            loading={lazy ? "lazy" : ""}
            className={className}
            onError={() => setERR(true)}
            onClick={() =>
                preview ? dispatch(previewImage(!err ? src : BrokenIMG)) : ""
            }
        />
    );
};
