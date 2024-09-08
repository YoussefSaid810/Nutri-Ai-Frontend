import React, { useState } from "react";
import style from "./TabViewController.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabViewController = ({
    children,
    ctrBTNs,
    cancelFunction = () => {},
}) => {
    const [tabIDX, setTabIDX] = useState(0);
    return (
        <div className={style.TabController}>
            <div className={style.btnCTRLs}>
                {ctrBTNs.map((btn, idx) => (
                    <button
                        className={tabIDX === idx ? style.active : ""}
                        key={idx}
                        type="button"
                        aria-label={btn.show}
                        aria-controls={btn.target}
                        onClick={() => setTabIDX(idx)}>
                        {btn.show}
                    </button>
                ))}
            </div>
            <div className={style.TabViewer}>
                <div className={style.Tab}>{children}</div>
            </div>
        </div>
    );
};

export default TabViewController;
