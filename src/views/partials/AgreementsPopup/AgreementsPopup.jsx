import React from "react";
import style from "./AgreementsPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AgreementsPopup = ({
    ICON,
    viewText,
    agreementsFunction = () => {},
    cancelFunction = () => {},
}) => {
    return (
        <div className={style.popup}>
            <div className={style.overlay} onClick={cancelFunction}></div>
            <div className={style.innerPopup}>
                <div className={style.bodyView}>
                    {ICON && (
                        <FontAwesomeIcon className={style.icon} icon={ICON} />
                    )}
                    <h3>{viewText}</h3>
                </div>
                <div className={style.footerBTNs}>
                    <button onClick={agreementsFunction}>Agree</button>
                    <button onClick={cancelFunction}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AgreementsPopup;
