import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./CoursesGrid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faBackwardFast,
    faBackwardStep,
    faForwardFast,
    faForwardStep,
    faGripLines,
    faSearch,
    faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import Selector from "../Selector/Selector";
import Card, { RowCard } from "../Cards/Cards";
import { Link } from "react-router-dom";
import NotFound from "../../../assets/404NotFound/404NotFound.png";
import Offline from "../../../assets/Offline/Offline.png";
import { ImageView } from "../ImageView/ImageView";
import { AnimatePresence, motion } from "framer-motion";
import { GridCards } from "../../../Configs/AnimationVariances";

const CoursesGrid = ({ foods = [], total, setPageIDX, curIDX, fetchFoods }) => {
    const [gType, setGType] = useState(0);
    const [view_foods, setFoods] = useState(foods);

    const searchForCourse = (event) => {
        const key = event.target.value.toLowerCase();

        let newFoods = foods.filter((food) =>
            ("" + food.name).toLowerCase().includes(key)
        );

        setFoods(newFoods);
    };

    const showGrid = () => {
        if (gType == 0)
            return (
                <motion.div
                    transition={{ staggerChildren: 0.2 }}
                    className="gridTemp grid_t_0">
                    <AnimatePresence mode="wait">
                        {(view_foods &&
                            view_foods.length !== 0 &&
                            view_foods.map((food, idx) => (
                                <motion.div
                                    variants={GridCards.card}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    key={food.id}>
                                    <Card data={food} />
                                </motion.div>
                            ))) || (
                            <motion.div
                                variants={GridCards.card}
                                initial="hidden"
                                animate="visible"
                                exit="exit">
                                <ImageView
                                    className="NotFoundImage"
                                    lazy={false}
                                    src={navigator.onLine ? NotFound : Offline}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            );
        else
            return (
                <div className="gridTemp grid_t_1">
                    {(view_foods &&
                        view_foods.length !== 0 &&
                        view_foods.map((food, idx) => (
                            <div className="rowCard">
                                <RowCard data={food} key={idx} />
                            </div>
                        ))) || (
                        <ImageView className="NotFoundImage" src={NotFound} />
                    )}
                </div>
            );
    };

    const showNavigator = () => {
        const navBTNs = [];
        curIDX = Number(curIDX);
        let start =
            curIDX - 2 > 0
                ? curIDX - 2 // t
                : 1;

        let end =
            curIDX + 2 <= total
                ? curIDX + 2 // t
                : total;

        end = end - start === 4 ? end : start + 4 <= total ? start + 4 : total;

        start = end - start === 4 ? start : end - 4 >= 1 ? end - 4 : 1;

        for (; start <= end; start++) {
            const idx = start;
            navBTNs.push(
                <Link
                    key={start}
                    to={`/meals?page=${idx}`}
                    className={curIDX === start ? "active" : ""}
                    onClick={() => {
                        fetchFoods(idx);
                        setPageIDX(idx);
                    }}>
                    {start}
                </Link>
            );
        }

        return navBTNs;
    };

    useEffect(() => {
        setFoods(foods);
    }, [foods]);

    return (
        <Fragment>
            <section className="coursesGrid">
                <div className="header">
                    <div className="start">
                        <div className="sort">
                            <Selector
                                values={[
                                    {
                                        view: "Most Popular",
                                        value: "MOST_POPULAR",
                                    },
                                    {
                                        view: "Top Rated",
                                        value: "TOP_RATED",
                                    },
                                    {
                                        view: "The newest",
                                        value: "NEWEST",
                                    },
                                ]}
                                name={"Sort by"}
                                retValue={() => {}}
                            />
                        </div>

                        <div
                            className={`viewToggler ${
                                gType == 0 ? "active" : ""
                            }`}
                            onClick={() => {
                                setGType(0);
                            }}>
                            <FontAwesomeIcon icon={faTableCellsLarge} />
                        </div>

                        <div
                            className={`viewToggler ${
                                gType == 1 ? "active" : ""
                            }`}
                            onClick={() => {
                                setGType(1);
                            }}>
                            <FontAwesomeIcon icon={faGripLines} />
                        </div>
                    </div>
                    <div className="search">
                        <span className="icon">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            type="text"
                            name="search"
                            list="search_list"
                            onChange={searchForCourse}
                            placeholder="Search for a meal..."
                        />
                        <datalist id="search_list">
                            {view_foods &&
                                view_foods.map((meal, idx) => (
                                    <option
                                        key={idx}
                                        value={meal.name}></option>
                                ))}
                        </datalist>
                    </div>
                </div>
                <div className="grid">{showGrid()}</div>
                <div className="paging">
                    <Link
                        to={`/meals?page=${1}`}
                        className={curIDX <= 1 ? "disabled" : ""}
                        onClick={() => {
                            fetchFoods(1);
                            setPageIDX(1);
                        }}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} />
                    </Link>

                    <Link
                        to={`/meals?page=${Number(curIDX) - 1}`}
                        className={curIDX <= 1 ? "disabled" : ""}
                        onClick={() => {
                            fetchFoods(curIDX - 1);
                            setPageIDX(curIDX - 1);
                        }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </Link>

                    <div>{showNavigator()}</div>

                    <Link
                        to={`/meals?page=${Number(curIDX) + 1}`}
                        className={curIDX >= total ? "disabled" : ""}
                        onClick={() => {
                            fetchFoods(curIDX + 1);
                            setPageIDX(curIDX + 1);
                        }}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>

                    <Link
                        to={`/meals?page=${total}`}
                        className={curIDX >= total ? "disabled" : ""}
                        onClick={() => {
                            fetchFoods(total);
                            setPageIDX(total);
                        }}>
                        <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Link>
                </div>
            </section>
        </Fragment>
    );
};

export default CoursesGrid;
