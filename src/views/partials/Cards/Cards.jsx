import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToPreferences } from "services/Auth/addToPreferences";
import { logoutUser, setUser } from "store/Reducers/userReducer";
import { addNotification } from "store/Reducers/NotificationReducer";
import { ImageView } from "../ImageView/ImageView";

const stars = (course) => {
    const rate = Math.trunc(course.rate);
    const fraction = course.rate - rate;
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

const beauty_Num = (num) => {
    const beauty = num || 0;
    if (beauty < 1000) return beauty;
    else if (Math.trunc(beauty / 10 ** 6) != 0)
        return (beauty / 10 ** 6).toFixed(1) + "M";
    else if (Math.trunc(beauty / 10 ** 3) != 0)
        return Math.trunc(beauty / 1000) + "K";
};

const PreferencesControl = async (id, dispatch, nav) => {
    let response = await AddToPreferences(id);
    if (response.status === 200) {
        dispatch(setUser(response.data));
        dispatch(
            addNotification({
                message: "Your preferences has been updated successfully",
                type: "success",
            })
        );
    } else if (response.status === 401) {
        dispatch(logoutUser());
        nav("/auth/account/login");
        dispatch(
            addNotification({
                message: "Your session has expired please login again",
                type: "warn",
            })
        );
    }
};

const Card = ({ data, badge }) => {
    const user = useSelector((store) => store.user);
    const [isPreferred, setPreferred] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const checkInPreferences = () => {
        let rtVal = false;
        if (user)
            user.preferences.forEach((meal) => {
                if (meal.id === data.id) {
                    rtVal = true;
                    return true;
                }
            });
        return rtVal;
    };

    useEffect(() => {
        const rtVal = checkInPreferences();
        setPreferred(rtVal);
    }, [user]);

    return (
        <Fragment>
            <div className="FoodCard CourseCard">
                {badge && <div className="badge">{badge}</div>}
                <div className="img">
                    <ImageView
                        src={data.image}
                        alt={data.name}
                        srcSet={data.image}
                    />
                </div>

                <div className="info">
                    <p className="name">{data.name}</p>

                    <p className="ingredients">
                        {data.ingredients &&
                            data.ingredients.map((ing, idx) => (
                                <a key={idx} href="#">
                                    {ing.name}
                                </a>
                            ))}
                    </p>

                    <div className="footer">
                        <div className="rating">
                            <span>
                                {data.rate || 0} (
                                {beauty_Num(data.popularity) || 0})
                            </span>
                            <div className="stars">{stars(data)}</div>
                        </div>
                        <div className="pricing">
                            <p className="new">{data.quantity}</p>
                            <p className="calc">{data.measure}</p>
                        </div>
                    </div>
                </div>

                <div className="ctrlBTNS">
                    <Link to={`/meals/${data.id}`}>Know More</Link>
                    <button
                        className={isPreferred ? "active" : ""}
                        onClick={
                            user
                                ? () =>
                                      PreferencesControl(data.id, dispatch, nav)
                                : () => nav("/auth/account/login")
                        }>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export const RowCard = ({ data, badge }) => {
    const user = useSelector((store) => store.user);
    const [isPreferred, setPreferred] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const checkInPreferences = () => {
        let rtVal = false;
        if (user)
            user.preferences.forEach((meal) => {
                if (meal.id === data.id) {
                    rtVal = true;
                    return true;
                }
            });
        return rtVal;
    };

    useEffect(() => {
        const rtVal = checkInPreferences();
        setPreferred(rtVal);
    }, [user]);

    return (
        <Fragment>
            <div className="FoodCard HzCourseCard">
                {badge && <div className="badge">{badge}</div>}

                <div className="img">
                    <ImageView
                        src={data.image}
                        alt={data.name}
                        srcSet={data.image}
                    />
                </div>

                <div className="info">
                    <div className="start">
                        <div>
                            <p className="name">{data.name}</p>

                            <p className="ingredients">
                                {data.ingredients &&
                                    data.ingredients.map((ing, idx) => (
                                        <a key={idx} href="#">
                                            {ing.name}
                                        </a>
                                    ))}
                            </p>
                        </div>

                        <div className="data">
                            <div className="rating">
                                <span>
                                    {data.rate || 0} (
                                    {beauty_Num(data.popularity)})
                                </span>
                                <div className="stars">{stars(data)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="end">
                        <div className="ctrlBTNS">
                            <Link to={`/meals/${data.id}`}>Know More</Link>
                            <button
                                className={isPreferred ? "active" : ""}
                                onClick={
                                    user
                                        ? () =>
                                              PreferencesControl(
                                                  data.id,
                                                  dispatch,
                                                  nav
                                              )
                                        : () => nav("/auth/account/login")
                                }>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>

                        <div className="pricing">
                            <p className="new">{data.quantity}</p>
                            <p className="calc">{data.measure}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Card;
