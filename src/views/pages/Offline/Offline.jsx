import React from "react";
import { Fragment } from "react";
import "./Offline.css";
import image from "../../../assets/Offline/Offline.png";
import { ImageView } from "views/partials/ImageView/ImageView";
import { Link, useNavigate } from "react-router-dom";

const Offline = () => {
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
                    <h3>403</h3>
                    <h4>
                        Oops, seems that you are currently <span>offline</span>
                    </h4>
                    <p>
                        This sites can't be reached for now, please connect to
                        your WIFI then try again later
                    </p>
                    <div className="links">
                        <Link to={"/"}>Go Home</Link>
                        <Link onClick={goBack}>Go Back</Link>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default Offline;
