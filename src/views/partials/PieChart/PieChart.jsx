import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import style from "./PieChart.module.css";

export const PieChart = ({
    total = 100,
    measure = "",
    values = [],
    palette = [],
}) => {
    const [totalVal, setTotal] = useState(total);
    const [currentVal, setCurrent] = useState(0);
    const [styleView, setStyleView] = useState("");

    useEffect(() => {
        let last = 0;
        let style = `conic-gradient(var(--theme-color) ${last}deg`;
        setCurrent(
            values.reduce((acc, val, idx) => {
                style += `,${
                    palette[idx][1] || "var(--theme-color)"
                } ${last}deg,${palette[idx][0] || "var(--theme-color)"} ${
                    (val.current / totalVal) * 360 + (acc / totalVal) * 360
                }deg`;
                last = (val.current / totalVal) * 360 + (acc / totalVal) * 360;
                return acc + val.current;
            }, 0)
        );
        setStyleView(
            style + `, var(--third-color) ${(currentVal / totalVal) * 360}deg)`
        );
    }, [total, values]);
    return (
        <Fragment>
            <div className={style.piechart}>
                <div
                    className={style.pieView}
                    style={{
                        background: styleView,
                    }}>
                    <div className={style.counter}>
                        <p>{Math.round((currentVal / total) * 100)}%</p>
                        <p className={style.valueView}>
                            {currentVal + measure} / {total + measure}
                        </p>
                    </div>
                </div>
                <div className={style.valuesView}>
                    {values.map((value, idx) => (
                        <div key={idx}>
                            <span
                                style={{
                                    background:
                                        palette[idx][0] || "var(--theme-color)",
                                }}></span>
                            <p>{value.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};
