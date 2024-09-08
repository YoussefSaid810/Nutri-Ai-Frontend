import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./MealView.css";
import { ImageView } from "views/partials/ImageView/ImageView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "store/Reducers/NotificationReducer";
import { getOneMeal } from "services/Food/food";
import Waiting from "views/partials/Waiting/Waiting";

const stars = (meal) => {
    const rate = Math.trunc(meal.rate);
    const fraction = meal.rate - rate;
    let stars = [];

    for (let i = 0; i < rate; i++)
        stars.push(
            <span key={i}>
                <FontAwesomeIcon icon={faStar} />
            </span>
        );

    if (fraction >= 0.5)
        stars.push(
            <span key={4}>
                <FontAwesomeIcon icon={faStarHalfStroke} />
            </span>
        );

    for (let i = stars.length; i < 5; i++)
        stars.push(
            <span className="icon" key={i}>
                <FontAwesomeIcon icon={faStar} />
            </span>
        );

    return stars;
};

const MealView = () => {
    const [MEAL, setMEAL] = useState(null);
    const [fetchingMeals, setFetchingMealsData] = useState(false);
    const { id } = useParams();
    const dispatch = useDispatch();

    const fetchMeal = async () => {
        setFetchingMealsData(true);
        let res = await getOneMeal(id);
        if (res && !res.err) {
            setMEAL(res.data);
        } else {
            dispatch(
                addNotification({
                    message: "Something went wrong while fetching the data.",
                    type: "fail",
                })
            );
        }
        setFetchingMealsData(false);
    };

    useEffect(() => {
        fetchMeal();
    }, []);

    return (
        <Fragment>
            {!MEAL && fetchingMeals && (
                <div className="waitingScreenView">
                    <Waiting text="Getting meal's data..." />
                </div>
            )}
            {MEAL && (
                <section className="meal">
                    <div
                        className="header"
                        style={{
                            backgroundImage: `url('${
                                MEAL.image.startsWith("/")
                                    ? process.env.REACT_APP_SERVER_URI +
                                      MEAL.image
                                    : MEAL.image
                            }')`,
                        }}>
                        <div className="overlay"></div>
                        <div className="MealInfo">
                            <ImageView src={MEAL.image} preview />
                            <div>
                                <p className="name">{MEAL.name}</p>
                                <div className="rating">{stars(MEAL)}</div>
                            </div>
                        </div>
                    </div>

                    <div className="information">
                        <aside>
                            <div className="cardView">
                                <h2>Serving Information</h2>

                                <div className="dataView">
                                    <div className="key">serving</div>
                                    <div className="value">
                                        {MEAL.quantity}
                                        <span>{MEAL.measure}</span>
                                    </div>
                                </div>

                                <div className="dataView">
                                    <div className="key">calories</div>
                                    <div className="value">
                                        {MEAL.calories}
                                        <span>calory</span>
                                    </div>
                                </div>

                                <div className="dataView">
                                    <div className="key">fats</div>
                                    <div className="value">
                                        {MEAL.fats}
                                        <span>gram</span>
                                    </div>
                                </div>

                                <div className="dataView">
                                    <div className="key">carbohydrate</div>
                                    <div className="value">
                                        {MEAL.carbs}
                                        <span>gram</span>
                                    </div>
                                </div>

                                <div className="dataView">
                                    <div className="key">protein</div>
                                    <div className="value">
                                        {MEAL.protein}
                                        <span>gram</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <div>
                            <div className="data">
                                <div className="cardView">
                                    <h2>Dish type</h2>
                                    <ul>
                                        {MEAL.dishType.map((type, idx) => (
                                            <li key={idx}>{type}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="cardView">
                                    <h2>Diet type</h2>
                                    <ul>
                                        {MEAL.dietType.map((type, idx) => (
                                            <li key={idx}>{type}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="cardView">
                                <div className="ingredients">
                                    {MEAL.ingredients.map((ing, idx) => (
                                        <a key={idx} href="#">
                                            {ing.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default MealView;
