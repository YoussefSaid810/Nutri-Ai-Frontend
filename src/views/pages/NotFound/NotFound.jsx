import React from "react";
import { Fragment } from "react";
import "./NotFound.css";
import image from "../../../assets/404NotFound/404NotFound.png";
import { ImageView } from "views/partials/ImageView/ImageView";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const nav = useNavigate();
    const goBack = (evt) => {
        evt.preventDefault();
        nav(-1);
    };
    return (
        <Fragment>
            <section className="Offline">
                <div className="dataView">
                    <ImageView src={image} alt="not connected" />
                    <h4>Oops, This URL can't be found</h4>
                    <div className="links">
                        <Link to={"/"}>Go Home</Link>
                        <Link onClick={goBack}>Go Back</Link>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default NotFound;
