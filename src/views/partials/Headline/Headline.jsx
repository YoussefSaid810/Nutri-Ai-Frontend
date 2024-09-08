import React from "react";
import "./Headline.css";

const Headline = ({ headline, quote }) => {
    return (
        <div className="headline">
            <h2>
                <span>{headline}</span>
            </h2>
            <p>{quote}</p>
        </div>
    );
};

export default Headline;
