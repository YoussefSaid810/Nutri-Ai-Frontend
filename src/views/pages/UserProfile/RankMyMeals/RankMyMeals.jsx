import React, { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import "./RankMyMeals.css";
import Card from "views/partials/Cards/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faCheck,
    faCow,
    faLeaf,
    faMagnifyingGlass,
    faSeedling,
    faUtensilSpoon,
    faUtensils,
    faWheatAlt,
    faX,
} from "@fortawesome/free-solid-svg-icons";

import Image404 from "../../../../assets/404NotFound/404NotFound.png";
import { debounceTime, distinctUntilChanged, fromEvent, map } from "rxjs";
import {
    getListOfIngredients,
    searchForIngredient,
} from "services/Ingredients/ingredients";
import { useDispatch } from "react-redux";
import { addNotification } from "store/Reducers/NotificationReducer";
import { loadingState } from "store/Reducers/LoadingReducer";
import { rankMyMeals } from "services/Ai/rankMyMeals";
import { generateOnePlan } from "services/Ai/generateOnePlan";
import { allRankedMeals } from "services/Ai/rankedMeals";
import { ImageView } from "views/partials/ImageView/ImageView";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "store/Reducers/userReducer";
import DailyPlans from "../DailyPlans/DailyPlans";
import Waiting from "views/partials/Waiting/Waiting";

const RankMyMeals = () => {
    const navigate = useNavigate();
    const MIN_INGREDIENTS = 1;
    const [fetchingIngresData, setFetchingIngredsData] = useState(false);
    const [fetchingRankedData, setFetchingRankedData] = useState(false);
    const [reRank, setReRank] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [userRankedMeals, setUserRankedMeals] = useState([]);
    const [userDailyPlans, setUserDailyPlans] = useState([]);
    const [tab, setTab] = useState("My_Ranked_Meals");
    const [rankWarning, setRankWarning] = useState(false);
    let [ingredients, setIngredients] = useState([]);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    let [steps, setSteps] = useState({
        index: 0,
        head: [
            `Please select your favorite ingredients (Minimum ${MIN_INGREDIENTS} ingredients)`,
            "Please select ingredients that you wouldn't like to be recommended (optional)",
            "Please select your diet type (optional)",
        ],
        values: {
            0: [], // Preferences
            1: [], // Exceptional
            2: "None", // Diet types
        },
    });

    let [DietType, setDietType] = useState("None");

    useEffect(() => {
        const fetchFoods = async () => {
            setFetchingRankedData(true);
            let res = await allRankedMeals();
            if (res && !res.err) {
                setUserRankedMeals(res.data.data);
            } else if (res.status === 404) {
                if (!rankWarning) {
                    dispatch(
                        addNotification({
                            type: "wait",
                            message: res.err,
                        })
                    );
                    setRankWarning(true);
                }
                setUserRankedMeals(null);
            }
            setFetchingRankedData(false);
        };

        const fetchIngredients = async () => {
            setFetchingIngredsData(true);
            let res = await getListOfIngredients(0, 100);
            if (res && res.status === 200) {
                setIngredients(res.data);
            }
            setFetchingIngredsData(false);
        };

        if (!userRankedMeals || userRankedMeals.length === 0) {
            fetchFoods();
        }

        if (reRank && ingredients.length === 0) {
            fetchIngredients();
        }

        let inputSubscription = null;

        if (inputRef.current) {
            inputSubscription = fromEvent(inputRef.current, "input")
                .pipe(
                    map((e) => e.target.value),
                    distinctUntilChanged(),
                    debounceTime(700)
                )
                .subscribe(searchInIngredients);
        }

        return () => {
            if (inputSubscription) inputSubscription.unsubscribe();
        };
    }, [reRank]);

    const goNext = () => {
        if (steps.index === 0) {
            if (steps.values[steps.index].length >= MIN_INGREDIENTS)
                setSteps({
                    ...steps,
                    index: steps.index + 1,
                });
            else
                dispatch(
                    addNotification({
                        message:
                            "Preferences length should be more than or equal " +
                            MIN_INGREDIENTS,
                        type: "fail",
                    })
                );
        } else if (steps.index === 2) {
            RankMyMealsRequest();
        } else
            setSteps({
                ...steps,
                index: steps.index + 1,
            });
    };

    const requestMealReRank = () => {
        setSteps({ ...steps, index: 0 });
        setReRank(!reRank);
    };

    const searchInIngredients = async (key) => {
        setFetchingIngredsData(true);
        let foundIngredients = await searchForIngredient(key, [
            ...steps.values[0].map((i) => i.id),
            ...steps.values[1].map((i) => i.id),
        ]);
        setIngredients(foundIngredients.data);
        setFetchingIngredsData(false);
    };

    const addToSelectedList = (id) => {
        const selectedIngredient = ingredients.find((i) => i.id === id);
        const filtered = ingredients.filter((i) => i.id !== id);
        if (selectedIngredient) {
            // Update the list
            steps.values[`${steps.index}`] = [
                ...steps.values[`${steps.index}`],
                selectedIngredient,
            ];
            let stepsValues = steps.values;
            setSteps({
                ...steps,
                values: stepsValues,
            });

            setIngredients(filtered);
        }
    };

    const removeFromSelectedList = (id) => {
        const selectedIngredient = steps.values[steps.index].find(
            (i) => i.id === id
        );
        const filtered = steps.values[steps.index].filter((i) => i.id !== id);
        if (selectedIngredient) {
            // Update the list
            steps.values[`${steps.index}`] = filtered;
            let stepsValues = steps.values;
            setSteps({
                ...steps,
                values: stepsValues,
            });

            setIngredients([selectedIngredient, ...ingredients]);
        }
    };

    const addToDietList = (type) => {
        // Search the list
        setDietType(type);
    };

    const RankMyMealsRequest = async () => {
        setReRank(false);
        dispatch(loadingState(true));
        let preferences = steps.values[0].map((ingred) => ingred.name);
        let excludes = steps.values[1].map((ingred) => ingred.name);
        let response = await rankMyMeals(
            preferences,
            excludes,
            DietType,
            navigate
        );
        if (response && response.status === 200) {
            setUserRankedMeals(response.data.data);
            dispatch(
                addNotification({
                    message: "Your meals has been ranked successfully",
                    type: "success",
                })
            );
        } else if (response.status === 401) {
            dispatch(logoutUser());
            dispatch(
                addNotification({
                    message: response.err.response.data.message,
                    type: "fail",
                })
            );
        }
        dispatch(loadingState(false));
    };

    const generate_one_plan = async () => {
        dispatch(loadingState(true));
        let response = await generateOnePlan();
        if (response && response.data) {
            dispatch(
                addNotification({
                    message: "Your plan has been created successfully",
                    type: "success",
                })
            );
            setUserDailyPlans([response.data, ...userDailyPlans]);
            setTab("My_Generated_Plan");
        } else {
            dispatch(
                addNotification({
                    message: response.err.message,
                    type: "fail",
                })
            );
        }
        dispatch(loadingState(false));
    };

    return (
        <Fragment>
            <section className="aiRanker">
                <h2>Meals Ranker</h2>

                <div className="head">
                    <div className="start">
                        <p>
                            total ranked meals (
                            {userRankedMeals ? userRankedMeals.length : 0})
                        </p>
                        {/* <p className="status">
                            you are currently <span>in queue</span>
                        </p> */}
                    </div>
                    <div className="end">
                        <button type="button" onClick={requestMealReRank}>
                            rank my profile meals
                        </button>
                        {userRankedMeals && (
                            <div
                                className="button planeGenerator"
                                onClick={() =>
                                    setShowGenerator(!showGenerator)
                                }>
                                generate a meal-plan
                                <ul className={showGenerator ? "show" : ""}>
                                    <li>
                                        <button
                                            type="button"
                                            onClick={generate_one_plan}>
                                            Generate one plan
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button">
                                            Generate weakly plan
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="MiddleView">
                    <div className="mealsTabViews">
                        <div className="tabsControls">
                            <button
                                type="button"
                                className={`tab ${
                                    tab === "My_Ranked_Meals" && "active"
                                }`}
                                onClick={() => setTab("My_Ranked_Meals")}
                                aria-label="tab-button"
                                aria-controls="My_Ranked_Meals">
                                My Ranked Meals
                            </button>
                            <button
                                type="button"
                                className={`tab ${
                                    tab === "My_Generated_Plan" && "active"
                                }`}
                                aria-label="tab-button"
                                onClick={() => setTab("My_Generated_Plan")}
                                aria-controls="My_Generated_Plan">
                                User's Plans
                            </button>
                        </div>
                        <div className="ViewsContainer">
                            <div
                                className={`tab ${
                                    tab === "My_Ranked_Meals" && "show"
                                }`}
                                aria-label="tab"
                                id="My_Ranked_Meals">
                                {fetchingRankedData ? (
                                    <Waiting text="Please wait while getting your data" />
                                ) : (
                                    <Fragment>
                                        <div className="currentlyRankedMeals">
                                            {userRankedMeals &&
                                                userRankedMeals.length > 0 &&
                                                userRankedMeals.map(
                                                    (food, idx) => (
                                                        <div
                                                            className="cardContainer"
                                                            key={idx}>
                                                            <Card data={food} />
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                        {!userRankedMeals && (
                                            <div className="noData">
                                                <ImageView src={Image404} />
                                                <h3>
                                                    Please rank your meals first
                                                </h3>
                                                <button
                                                    type="button"
                                                    aria-label="button"
                                                    aria-controls="RankModal"
                                                    onClick={requestMealReRank}>
                                                    Rank my meals
                                                </button>
                                            </div>
                                        )}
                                    </Fragment>
                                )}
                            </div>
                            <div
                                className={`tab ${
                                    tab === "My_Generated_Plan" && "show"
                                }`}
                                aria-label="tab"
                                id="My_Generated_Plan">
                                <DailyPlans
                                    userDailyPlansData={userDailyPlans}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`rankModal ${reRank ? "show" : ""}`}
                    aria-modal
                    id="RankModal">
                    <div className="overlay" onClick={requestMealReRank}></div>
                    <div className="modal">
                        <div className="header">
                            <p>({1 + steps.index + "/" + 3})</p>
                            <h4>{steps.head[steps.index]}</h4>
                        </div>

                        {steps.index !== 2 && (
                            <Fragment>
                                <div className="searchArea">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search"
                                        list="ingredientSearchList"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            searchInIngredients(
                                                inputRef.current.value
                                            )
                                        }>
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                        />
                                    </button>

                                    <datalist id="ingredientSearchList">
                                        {ingredients &&
                                            ingredients.length > 0 &&
                                            ingredients.map((i) => (
                                                <option
                                                    value={i.name}
                                                    key={i.id}>
                                                    {i.id}
                                                </option>
                                            ))}
                                    </datalist>
                                </div>

                                <div className="selectedIngredients">
                                    {steps.values[steps.index].length > 0 &&
                                        steps.values[steps.index].map(
                                            (i, idx) => (
                                                <div
                                                    className="ingredient"
                                                    key={idx}
                                                    onClick={() =>
                                                        removeFromSelectedList(
                                                            i.id
                                                        )
                                                    }>
                                                    <p>{i.name}</p>
                                                </div>
                                            )
                                        )}
                                </div>

                                <div className="viewArea">
                                    {fetchingIngresData ? (
                                        <Waiting text="Searching..." />
                                    ) : (
                                        ingredients.length > 0 &&
                                        ingredients.map((i, idx) => (
                                            <div
                                                className="ingredient"
                                                key={idx}
                                                onClick={() =>
                                                    addToSelectedList(i.id)
                                                }>
                                                <p>{i.name}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Fragment>
                        )}

                        {steps.index === 2 && (
                            <Fragment>
                                <div className="dietTypes">
                                    <div className="dietType">
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="NONE"
                                                name="dietType"
                                                checked={DietType === "None"}
                                                onClick={() =>
                                                    addToDietList("None")
                                                }
                                            />
                                            <label htmlFor="NONE">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faUtensils}
                                                    />
                                                </span>
                                                <p>Not Specified</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="VEGETARIAN"
                                                name="dietType"
                                                checked={
                                                    DietType === "VEGETARIAN"
                                                }
                                                onClick={() =>
                                                    addToDietList("VEGETARIAN")
                                                }
                                            />
                                            <label htmlFor="VEGETARIAN">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faSeedling}
                                                    />
                                                </span>
                                                <p>vegetarian</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="VEGAN"
                                                name="dietType"
                                                checked={DietType === "VEGAN"}
                                                onClick={() =>
                                                    addToDietList("VEGAN")
                                                }
                                            />
                                            <label htmlFor="VEGAN">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faLeaf}
                                                    />
                                                </span>
                                                <p>vegan</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="GLUTENFREE"
                                                name="dietType"
                                                checked={
                                                    DietType === "GLUTENFREE"
                                                }
                                                onClick={() =>
                                                    addToDietList("GLUTENFREE")
                                                }
                                            />
                                            <label htmlFor="GLUTENFREE">
                                                <span className="free">
                                                    <FontAwesomeIcon
                                                        icon={faWheatAlt}
                                                    />
                                                </span>
                                                <p>gluten free</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="DAIRYFREE"
                                                name="dietType"
                                                checked={
                                                    DietType === "DAIRYFREE"
                                                }
                                                onClick={() =>
                                                    addToDietList("DAIRYFREE")
                                                }
                                            />
                                            <label htmlFor="DAIRYFREE">
                                                <span className="free">
                                                    <FontAwesomeIcon
                                                        icon={faCow}
                                                    />
                                                </span>
                                                <p>Dairy free</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="LOWFODMAP"
                                                name="dietType"
                                                checked={
                                                    DietType === "LOWFODMAP"
                                                }
                                                onClick={() =>
                                                    addToDietList("LOWFODMAP")
                                                }
                                            />
                                            <label htmlFor="LOWFODMAP">
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faUtensilSpoon}
                                                    />
                                                </span>
                                                <p>Lowfod map</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="KETOGENIC"
                                                name="dietType"
                                                checked={
                                                    DietType === "KETOGENIC"
                                                }
                                                onClick={() =>
                                                    addToDietList("KETOGENIC")
                                                }
                                            />
                                            <label htmlFor="KETOGENIC">
                                                <span className="notIcon">
                                                    KETO
                                                </span>
                                                <p>Ketogenic</p>
                                            </label>
                                        </div>
                                        <div className="dietInput">
                                            <input
                                                type="radio"
                                                id="WHOLE30"
                                                name="dietType"
                                                checked={DietType === "WHOLE30"}
                                                onClick={() =>
                                                    addToDietList("WHOLE30")
                                                }
                                            />
                                            <label htmlFor="WHOLE30">
                                                <span className="notIcon">
                                                    W30
                                                </span>

                                                <p>Whole 30</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}

                        <div className="modalFooter">
                            <button
                                type="button"
                                className="back"
                                onClick={() => {
                                    if (steps.index !== 0)
                                        setSteps({
                                            ...steps,
                                            index: steps.index - 1,
                                        });
                                    else requestMealReRank();
                                }}>
                                {steps.index !== 0 ? (
                                    <Fragment>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faAngleLeft}
                                            />
                                        </span>
                                        Go Back
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <span>
                                            <FontAwesomeIcon icon={faX} />
                                        </span>
                                        Close
                                    </Fragment>
                                )}
                            </button>
                            <button type="button" onClick={goNext}>
                                {steps.index !== 2 ? (
                                    <Fragment>
                                        Next
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faAngleRight}
                                            />
                                        </span>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <span>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        Finish
                                    </Fragment>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default RankMyMeals;
