import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getAllFoods } from "services/Food/food";
import { RowCard } from "views/partials/Cards/Cards";
import "./Suggestions.css";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";

const Suggestions = () => {
    const [foods, setFoods] = useState([]);

    const fetchFoods = async () => {
        let res = await getAllFoods(0, 5);
        if (res && !res.err) {
            setFoods(res.data.data);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <Fragment>
            <section className="dietHistory">
                <ProfileTopView />
                <h2>Based on your preferences</h2>

                <div className="gridView">
                    {foods.map((food, idx) => (
                        <div className="cardContainer">
                            <RowCard data={food} key={idx} />
                        </div>
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

export default Suggestions;
