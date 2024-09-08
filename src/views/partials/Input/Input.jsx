import React, { useEffect, useState } from "react";
import "./Input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addNotification } from "store/Reducers/NotificationReducer";

const Input = ({
    id,
    label,
    type = "text",
    idx,
    name,
    isPassword,
    icon,
    post,
    pre,
    bgColor,
    value = 0,
    min = 0,
    max = 10000,
    measure = "px",
    autocomplete = "",
    small,
    errViewer = () => {},
    onChange = () => {},
}) => {
    isPassword = isPassword ? isPassword : false;
    const [passView, setPassView] = useState(isPassword);
    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(value);
    }, [value]);

    return (
        <div>
            <div className="input" style={{ background: bgColor }}>
                {icon ? (
                    <div className="icon">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                ) : (
                    ""
                )}

                {type == "text_area" ? (
                    <textarea
                        name={name}
                        id={id || name}
                        tabIndex={idx}
                        placeholder={value ? val : name}
                        onChange={(e) => {
                            onChange(e);
                        }}
                        cols="30"
                        rows="10"></textarea>
                ) : type == "range" ? (
                    <input
                        type={
                            !isPassword ? type : !passView ? "text" : "password"
                        }
                        name={name}
                        id={id || name}
                        tabIndex={idx}
                        min={min}
                        max={max}
                        autoComplete={autocomplete}
                        onChange={(e) => {
                            let val = Number(e.target.value);
                            if (
                                type === "number" &&
                                e.target.value != "" &&
                                (val < min || val > max)
                            ) {
                                errViewer((errs) => {
                                    errs[
                                        name
                                    ] = `${label} must be in range of (${min}~${max})`;
                                    return errs;
                                });
                            } else {
                                errViewer((errs) => {
                                    errs[name] = null;
                                    return errs;
                                });
                            }
                            setVal(Number(e.target.value));
                            onChange(e);
                        }}
                        value={type === "range" ? val : ""}
                        placeholder={value ? val : name}
                    />
                ) : (
                    <input
                        type={
                            !isPassword ? type : !passView ? "text" : "password"
                        }
                        name={name}
                        id={id || name}
                        tabIndex={idx}
                        min={min}
                        max={max}
                        autoComplete={autocomplete}
                        onChange={(e) => {
                            let val = Number(e.target.value);
                            if (
                                type === "number" &&
                                e.target.value != "" &&
                                (val < min || val > max)
                            ) {
                                errViewer((errs) => {
                                    errs[
                                        name
                                    ] = `${label} must be in range of (${min}~${max})`;
                                    return errs;
                                });
                            } else {
                                errViewer((errs) => {
                                    errs[name] = null;
                                    return errs;
                                });
                            }
                            setVal(Number(e.target.value));
                            onChange(e);
                        }}
                        placeholder={value ? val : name}
                    />
                )}
                {pre ? <div className="pre">{pre}</div> : ""}

                <label htmlFor={id || name}>{label}</label>

                {isPassword ? (
                    <button
                        tabIndex={1000}
                        type="button"
                        onClick={() => {
                            setPassView(!passView);
                        }}>
                        <FontAwesomeIcon
                            icon={!passView ? faEye : faEyeLowVision}
                        />
                    </button>
                ) : (
                    ""
                )}

                {post ? <p className="post">{post}</p> : ""}

                {type === "range" ? (
                    <p className="post rangeValue">{val + measure}</p>
                ) : (
                    ""
                )}
            </div>

            {small && <small>{small}</small>}
        </div>
    );
};

export default Input;
