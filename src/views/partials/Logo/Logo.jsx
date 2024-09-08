import React from "react";
import { Fragment } from "react";
import style from "./Logo.css";

export const Logo = ({ size = 1 }) => {
    return (
        <Fragment>
            <span className={style.logo}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={`${size * 2}em`}
                    height={`${size * 2}em`}
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 192 192">
                    <path
                        className="cls-1"
                        d="M178,67.71v49.2a49.2,49.2,0,0,1-49.2,49.2h0a49.2,49.2,0,0,1-49.2-49.2V83.78A16.08,16.08,0,0,0,63.52,67.71h-.64A16.08,16.08,0,0,0,46.8,83.78h0A16.6,16.6,0,0,1,30.08,100.5,16.39,16.39,0,0,1,14,84.11v-9.4a39.8,39.8,0,0,1,39.8-39.8H72.6a39.8,39.8,0,0,1,39.8,39.8V115.1a16.66,16.66,0,0,0,16.72,16.72,16.4,16.4,0,0,0,16.08-16.4V67.71Z"
                    />
                    <path
                        className="cls-2"
                        d="M72.88,125.06A15.23,15.23,0,0,1,57.54,140.5H52.36a5.56,5.56,0,0,0-5.56,5.56v5.72A16.66,16.66,0,0,1,30.08,168.5C21.17,168.33,14,161.06,14,150.67V125c0-8.09,7.73-15.82,17.26-15.82H56.49A16.39,16.39,0,0,1,72.88,125.06Z"
                    />
                    <circle className="cls-2" cx="161.6" cy="39.89" r="16.4" />
                </svg>
            </span>
        </Fragment>
    );
};
