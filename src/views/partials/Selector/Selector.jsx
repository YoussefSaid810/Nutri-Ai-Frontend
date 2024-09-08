import React, { useState } from "react";
import { Fragment } from "react";
import "./Selector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getIDX } from "Configs/constants";

const Selector = ({
    values,
    name,
    onChange = () => {},
    bgColor,
    color,
    border,
    selected,
}) => {
    const [view, setView] = useState(
        values[getIDX(values, selected, "value")].view
    );

    const changeVal = (e) => {
        const selectedVal = e.target.value;
        const value = values[getIDX(values, selectedVal, "value")];
        setView(value.view);
        onChange(value.value);
    };

    return (
        <Fragment>
            <div
                className="Selector"
                style={{ background: bgColor, color, border }}>
                <div className="view">
                    <p className="name">{name}</p>
                    <p className="viewVal">{view}</p>
                    <span className="icon">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </div>
                <select onChange={changeVal} name={name}>
                    {values.map((value, idx) => (
                        <option key={idx} value={value.value}>
                            {value.view}
                        </option>
                    ))}
                </select>
            </div>
        </Fragment>
    );
};

export default Selector;
