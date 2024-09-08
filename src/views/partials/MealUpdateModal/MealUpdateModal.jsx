import React, { useEffect, useState } from "react";
import style from "./MealUpdateModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabViewController from "../TabViewController/TabViewController";
import Input from "../Input/Input";
import { logoutUser } from "store/Reducers/userReducer";
import { addNotification } from "store/Reducers/NotificationReducer";
import { useDispatch } from "react-redux";
import MealInfo from "./MealInfo/MealInfo";

const MealUpdateModal = ({
    data,
    updateMealData = () => {},
    closingFunction = () => {},
}) => {
    const ctrBTNs = [
        { show: "meal information", target: "MEAL_INFO" },
        { show: "meal image", target: "MEAL_IMG" },
        { show: "meal nutrition", target: "MEAL_NUTRI" },
    ];

    return (
        <div className={style.popup} aria-modal="true">
            <div className={style.overlay} onClick={closingFunction}></div>
            <div className={style.innerPopup}>
                <TabViewController ctrBTNs={ctrBTNs}>
                    <MealInfo
                        data={data}
                        updateMealData={updateMealData}
                        closingFunction={closingFunction}
                    />
                </TabViewController>
            </div>
        </div>
    );
};

export default MealUpdateModal;
