import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./ListMeals.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMeal, getAdminFoods, getAllFoods } from "services/Food/food";
import MealCardViewer from "views/partials/MealCardViewer/MealCardViewer";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Waiting from "views/partials/Waiting/Waiting";
import MealUpdateModal from "views/partials/MealUpdateModal/MealUpdateModal";

const ListMeals = () => {
    const [meal, setMeal] = useState(null);
    const [updateMealModal, setUpdateMealModal] = useState(null);
    let [MEALS, setMEALS] = useState([]);
    const [total, setTotal] = useState(0);
    let { index } = useParams();
    let [idx, setIDX] = useState(1);
    const [waiting, setWaiting] = useState(false);

    const fetchMeals = async (index, count) => {
        setWaiting(true);
        console.log(index);
        let res = await getAdminFoods(index, count);
        if (res && !res.err) {
            setMEALS(
                res.data.data.sort((m1, m2) => m1.popularity <= m2.popularity)
            );
            if (!total.length) setTotal(Math.ceil(res.data.total / count));
        }
        setWaiting(false);
    };

    const showNavigator = () => {
        const navBTNs = [];
        let cIDX = Number(idx);
        let start =
            cIDX - 2 >= 1
                ? cIDX - 2 // t
                : 1;

        let end =
            cIDX + 2 <= total
                ? cIDX + 2 // t
                : total;

        end = end - start === 4 ? end : start + 4 <= total ? start + 4 : total;

        start = end - start === 4 ? start : end - 4 >= 1 ? end - 4 : 1;

        for (; start <= end; start++) {
            const cIDX = start;
            navBTNs.push(
                <Link
                    key={start}
                    to={`/admin/meals/${Number(idx) === start ? idx : cIDX}`}
                    className={Number(idx) === start ? "active" : ""}>
                    {start}
                </Link>
            );
        }

        return navBTNs;
    };

    const deleteOneMeal = (id) => {
        setMEALS(MEALS.filter((meals) => meals.id !== id));
    };

    const updateMealData = (meal) => {
        const updateMealList = MEALS.map((m) => {
            if (m.id === meal.id) {
                return meal;
            }
            return m;
        });
        setMEALS(updateMealList);
    };

    const EditMeal = (id) => {
        const meal = MEALS.find((meal) => meal.id === id);
        setMeal(meal);
        setUpdateMealModal(true);
    };

    useEffect(() => {
        console.log(index);
        setIDX(index <= 1 ? 1 : index);
        fetchMeals(index <= 1 ? 1 : index, 20);
    }, [index]);

    return (
        <Fragment>
            {waiting ? (
                <Waiting text="Gathering Data..." />
            ) : (
                <section className="ListMeals">
                    <h3>Meals in System Page ({idx + "/" + total})</h3>

                    <div className="MealListViewer">
                        {MEALS.length !== 0 &&
                            MEALS.map((meal, idx) => (
                                <MealCardViewer
                                    key={idx}
                                    data={meal}
                                    deleteOneMeal={deleteOneMeal}
                                    updateMealData={updateMealData}
                                    EditMeal={EditMeal}
                                />
                            ))}
                    </div>

                    <div className="paging">
                        <Link
                            to={`/admin/meals/${1}`}
                            className={idx <= 1 ? "disabled" : ""}>
                            <FontAwesomeIcon icon={faAngleDoubleLeft} />
                        </Link>

                        <Link
                            to={`/admin/meals/${Number(idx) - 1}`}
                            className={idx <= 1 ? "disabled" : ""}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </Link>

                        <div>{showNavigator()}</div>

                        <Link
                            to={`/admin/meals/${Number(idx) + 1}`}
                            className={idx >= total - 1 ? "disabled" : ""}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Link>

                        <Link
                            to={`/admin/meals/${total}`}
                            className={idx >= total ? "disabled" : ""}>
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </Link>
                    </div>
                </section>
            )}

            {updateMealModal && meal && (
                <MealUpdateModal
                    data={meal}
                    closingFunction={() => setUpdateMealModal(false)}
                    updateMealData={updateMealData}
                />
            )}
        </Fragment>
    );
};

export default ListMeals;
