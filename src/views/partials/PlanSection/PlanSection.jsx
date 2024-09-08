import React, { useState } from "react";
import "./PlanSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Card, { RowCard } from "../Cards/Cards";
import { dateFormat } from "Configs/helpers";

const PlanSection = ({ plan: { planDate, plan }, show = false, idx }) => {
    let [showCTRL, setShow] = useState(show);
    const [windowWidth, _] = useState(window.innerWidth);

    return (
        <div className={`PlanSection ${showCTRL && "show"}`}>
            <div className="header" onClick={() => setShow(!showCTRL)}>
                <h5>
                    Plan{idx && ` ${idx}`}: {windowWidth <= 600 && <br />} (
                    {dateFormat(planDate)})
                </h5>
                <span>
                    <FontAwesomeIcon icon={faAngleRight} />
                </span>
            </div>

            {windowWidth > 800 ? (
                <div className="planInnerViewer">
                    <RowCard data={plan.breakfast} badge="breakfast" />
                    <RowCard data={plan.lunch} badge="lunch" />
                    <RowCard data={plan.dinner} badge="dinner" />
                    <RowCard data={plan.snack} badge="snack" />
                </div>
            ) : (
                <div className="planInnerViewer">
                    <Card data={plan.breakfast} badge="breakfast" />
                    <Card data={plan.lunch} badge="lunch" />
                    <Card data={plan.dinner} badge="dinner" />
                    <Card data={plan.snack} badge="snack" />
                </div>
            )}
        </div>
    );
};

export default PlanSection;
