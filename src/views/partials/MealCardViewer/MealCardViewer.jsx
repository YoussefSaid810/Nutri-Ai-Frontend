import React, { useState } from "react";
import { Fragment } from "react";
import "./MealCardViewer.css";
import { ImageView } from "../ImageView/ImageView";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faPenAlt,
    faTrash,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { deleteMeal as mealDelete, updateMeal } from "services/Food/food";
import AgreementsPopup from "../AgreementsPopup/AgreementsPopup";
import { useDispatch } from "react-redux";
import { addNotification } from "store/Reducers/NotificationReducer";
import { type } from "@testing-library/user-event/dist/type";
import { loadingState } from "store/Reducers/LoadingReducer";
import MealUpdateModal from "../MealUpdateModal/MealUpdateModal";

const MealCardViewer = ({
    data: meal,
    deleteOneMeal,
    updateMealData,
    EditMeal,
}) => {
    const dispatch = useDispatch();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [hideConfirmation, setHideConfirmation] = useState(false);

    const DeleteMeal = async () => {
        setDeleteConfirmation(false);
        dispatch(loadingState(true));
        let res = await mealDelete(meal.id);

        if (res && res.status === 200) {
            dispatch(
                addNotification({
                    type: "success",
                    message: `Meal(${meal.name}) has been deleted successfully`,
                })
            );
            deleteOneMeal(meal.id);
        } else {
            dispatch(
                addNotification({
                    type: "fail",
                    message: res.err,
                })
            );
        }

        dispatch(loadingState(false));
    };

    const HideMeal = async () => {
        setHideConfirmation(false);
        dispatch(loadingState(true));
        let res = await updateMeal(meal.id, { hidden: !meal.hidden });

        if (res && res.status === 200) {
            dispatch(
                addNotification({
                    type: "success",
                    message: `Meal(${meal.name}) has been ${
                        !meal.hidden ? "Shown" : "Hidden"
                    } successfully`,
                })
            );
            updateMealData({ ...meal, hidden: !meal.hidden });
        } else {
            dispatch(
                addNotification({
                    type: "fail",
                    message: res.err,
                })
            );
        }
        dispatch(loadingState(false));
    };

    return (
        <Fragment>
            <div className="MealEditorCard">
                <div className="img">
                    <ImageView alt={meal.name} src={meal.image} preview />
                </div>
                <div className="info">
                    <p className="name">{meal.name}</p>
                    <div className="gridViewer">
                        <div className="dataView">
                            <p className="key">calories:</p>
                            <p className="data">
                                {meal.calories !== "" ? (
                                    meal.calories + "calory"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">cuisines:</p>
                            <p className="data">
                                {meal.cuisines !== "" ? (
                                    meal.cuisines
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">Diet Type:</p>
                            <p className="data">
                                {meal.dietType.length !== 0 ? (
                                    meal.dietType.map((d) => `${d},`)
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">Dish Type:</p>
                            <p className="data">
                                {meal.dishType.length !== 0 ? (
                                    meal.dishType.map((d) => `${d},`)
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">ingredients:</p>
                            <p className="data">
                                {meal.ingredients.length !== 0 ? (
                                    meal.ingredients.map((d) => `${d.name},`)
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">quantity:</p>
                            <p className="data">
                                {meal.quantity !== "" ? (
                                    meal.quantity + meal.measure
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">protein:</p>
                            <p className="data">
                                {meal.protein !== "" ? (
                                    meal.protein + "gram"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">carbs:</p>
                            <p className="data">
                                {meal.carbs !== "" ? (
                                    meal.carbs + "gram"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">Fats:</p>
                            <p className="data">
                                {meal.fats !== "" ? (
                                    meal.fats + "gram"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">percentCarbs:</p>
                            <p className="data">
                                {meal.percentCarbs !== "" ? (
                                    meal.percentCarbs + "%"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">percentProtein:</p>
                            <p className="data">
                                {meal.percentProtein !== "" ? (
                                    meal.percentProtein + "%"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                        <div className="dataView">
                            <p className="key">percentFat:</p>
                            <p className="data">
                                {meal.percentFat !== "" ? (
                                    meal.percentFat + "%"
                                ) : (
                                    <span className="danger">NULL</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="controlBTNs">
                    <Link to={`/meals/${meal.id}`} className="controlBTN view">
                        <FontAwesomeIcon icon={faEye} />
                        <span>View</span>
                    </Link>
                    <button
                        type="button"
                        className="controlBTN edit"
                        onClick={() => EditMeal(meal.id)}>
                        <FontAwesomeIcon icon={faPenAlt} />
                        <span>Edit</span>
                    </button>
                    <button
                        type="button"
                        className="controlBTN block"
                        onClick={() => setHideConfirmation(true)}>
                        <FontAwesomeIcon
                            icon={meal.hidden ? faEye : faEyeSlash}
                        />
                        <span>{meal.hidden ? "Show" : "Hide"}</span>
                    </button>
                    <button
                        type="button"
                        className="controlBTN delete"
                        onClick={() => setDeleteConfirmation(true)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {deleteConfirmation && (
                <AgreementsPopup
                    ICON={faTrashAlt}
                    viewText={"Are you sure you want to delete this meal?"}
                    agreementsFunction={DeleteMeal}
                    cancelFunction={() => setDeleteConfirmation(false)}
                />
            )}

            {hideConfirmation && (
                <AgreementsPopup
                    ICON={faTrashAlt}
                    viewText={`Are you sure you want to ${
                        !meal.hidden ? "show" : "hide"
                    } this meal?`}
                    agreementsFunction={HideMeal}
                    cancelFunction={() => setHideConfirmation(false)}
                />
            )}
        </Fragment>
    );
};

export default MealCardViewer;
