import React, { useEffect, useState } from "react";
import style from "./MealInfo.module.css";
import Input from "../../Input/Input";
import { useDispatch } from "react-redux";
import { updateMeal } from "services/Food/food";
import { addNotification } from "store/Reducers/NotificationReducer";
import { logoutUser } from "store/Reducers/userReducer";
import { loadingState } from "store/Reducers/LoadingReducer";

const MealInfo = ({
    data: meal,
    updateMealData = () => {},
    closingFunction = () => {},
}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(meal.name);
    const [img, setIMG] = useState(meal.image);
    const [quantity, setQuantity] = useState(meal.quantity);
    const [measure, setMeasure] = useState(meal.measure);
    const [ingredients, setIngredients] = useState(
        meal.ingredients.map((i) => i.name).toString()
    );

    const [dishType, setDishType] = useState({
        BREAKFAST: false,
        LUNCH: false,
        SNACK: false,
        SIDE_DISH: false,
        SOUP: false,
        SAUCE: false,
    });

    const [dietType, setDietType] = useState({
        VEGETARIAN: false,
        VEGAN: false,
        GLUTENFREE: false,
        DAIRYFREE: false,
        LOWFODMAP: false,
        KETOGENIC: false,
        WHOLE30: false,
    });

    const selectDiet = (value) => {
        setDietType({ ...dietType, ...value });
    };

    const selectDish = (value) => {
        setDishType({ ...dishType, ...value });
    };

    const HandelMealUpdate = async (e) => {
        dispatch(loadingState(true));
        const data = {
            name,
            image: img,
            quantity,
            measure,
            ingredients: ingredients
                .split(",")
                .map((i) => i.trim().toLowerCase())
                .filter((i) => i !== ""),
            dishType,
            dietType,
        };

        let res = await updateMeal(meal.id, data);
        if (res && res.data) {
            dispatch(
                addNotification({
                    message: `Meal(${meal.name}) has been updated successfully`,
                    type: "success",
                })
            );
            closingFunction();
            updateMealData(res.data);
        } else {
            dispatch(
                addNotification({
                    message: res.err,
                    type: "fail",
                })
            );
            if (res.status === 401) dispatch(logoutUser());
        }
        dispatch(loadingState(false));
    };

    useEffect(() => {
        setDishType({
            BREAKFAST: meal.dishType.indexOf("BREAKFAST") !== -1,
            LUNCH: meal.dishType.indexOf("LUNCH") !== -1,
            SNACK: meal.dishType.indexOf("SNACK") !== -1,
            SIDE_DISH: meal.dishType.indexOf("SIDE_DISH") !== -1,
            SOUP: meal.dishType.indexOf("SOUP") !== -1,
            SAUCE: meal.dishType.indexOf("SAUCE") !== -1,
        });

        setDietType({
            VEGETARIAN: meal.dietType.indexOf("VEGETARIAN") !== -1,
            VEGAN: meal.dietType.indexOf("VEGAN") !== -1,
            GLUTENFREE: meal.dietType.indexOf("GLUTENFREE") !== -1,
            DAIRYFREE: meal.dietType.indexOf("DAIRYFREE") !== -1,
            LOWFODMAP: meal.dietType.indexOf("LOWFODMAP") !== -1,
            KETOGENIC: meal.dietType.indexOf("KETOGENIC") !== -1,
            WHOLE30: meal.dietType.indexOf("WHOLE30") !== -1,
        });
    }, []);

    return (
        <div className={style.tab} id="UpdateForm">
            <div className={style.infoBodyView}>
                <Input
                    type="text"
                    name={"name"}
                    id={"name"}
                    label={"Meal name"}
                    pre={name}
                    onChange={(evt) => setName(evt.target.value)}
                    bgColor={"var(--bg-L2-color)"}
                />
                <Input
                    type="text"
                    name={"image"}
                    id={"image"}
                    label={"Meal image URL"}
                    pre={img}
                    onChange={(evt) => setIMG(evt.target.value)}
                    bgColor={"var(--bg-L2-color)"}
                />
                <Input
                    type="number"
                    name={"quantity"}
                    id={"quantity"}
                    min={1}
                    max={999}
                    label={"Meal quantity"}
                    pre={quantity}
                    onChange={(evt) => setQuantity(evt.target.value)}
                    bgColor={"var(--bg-L2-color)"}
                />
                <Input
                    type="text"
                    name={"measure"}
                    id={"measure"}
                    label={"Meal measurement"}
                    pre={measure}
                    onChange={(evt) => setMeasure(evt.target.value)}
                    bgColor={"var(--bg-L2-color)"}
                />
                <div className={style.fullWidth}>
                    <Input
                        type="text"
                        name={"ingredients"}
                        id={"ingredients"}
                        small={
                            "Ingredient names are separated by commas EX: rice, salt,...etc"
                        }
                        label={"Meal ingredients"}
                        pre={ingredients}
                        onChange={(evt) => setIngredients(evt.target.value)}
                        bgColor={"var(--bg-L2-color)"}
                    />
                </div>
                <div className={`${style.fullWidth} ${style.inputContainer}`}>
                    <h6 className={style.inputHead}>Diet type</h6>
                    <div className={`${style.selectionINPs}`}>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.VEGETARIAN}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        VEGETARIAN: !dietType.VEGETARIAN,
                                    });
                                }}
                            />
                            <span>VEGETARIAN</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.VEGAN}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        VEGAN: !dietType.VEGAN,
                                    });
                                }}
                            />
                            <span>VEGAN</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.GLUTENFREE}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        GLUTENFREE: !dietType.GLUTENFREE,
                                    });
                                }}
                            />
                            <span>GLUTENFREE</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.DAIRYFREE}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        DAIRYFREE: !dietType.DAIRYFREE,
                                    });
                                }}
                            />
                            <span>DAIRYFREE</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.LOWFODMAP}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        LOWFODMAP: !dietType.LOWFODMAP,
                                    });
                                }}
                            />
                            <span>LOWFODMAP</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dietType.KETOGENIC}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        KETOGENIC: !dietType.KETOGENIC,
                                    });
                                }}
                            />
                            <span>KETOGENIC</span>
                        </div>
                        <div
                            className={`${style.SelectionINP} ${style.fullWidth}`}>
                            <input
                                type="checkbox"
                                checked={dietType.WHOLE30}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDiet({
                                        WHOLE30: !dietType.WHOLE30,
                                    });
                                }}
                            />
                            <span>WHOLE30</span>
                        </div>
                    </div>
                </div>
                <div className={`${style.fullWidth} ${style.inputContainer}`}>
                    <h6 className={style.inputHead}>Dish type</h6>
                    <div className={`${style.selectionINPs}`}>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.BREAKFAST}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        BREAKFAST: !dishType.BREAKFAST,
                                    });
                                }}
                            />
                            <span>BREAKFAST</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.LUNCH}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        LUNCH: !dishType.LUNCH,
                                    });
                                }}
                            />
                            <span>LUNCH</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.SNACK}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        SNACK: !dishType.SNACK,
                                    });
                                }}
                            />
                            <span>SNACK</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.SIDE_DISH}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        SIDE_DISH: !dishType.SIDE_DISH,
                                    });
                                }}
                            />
                            <span>SIDE_DISH</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.SOUP}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        SOUP: !dishType.SOUP,
                                    });
                                }}
                            />
                            <span>SOUP</span>
                        </div>
                        <div className={style.SelectionINP}>
                            <input
                                type="checkbox"
                                checked={dishType.SAUCE}
                                onChange={() => {}}
                                onClick={(e) => {
                                    selectDish({
                                        SAUCE: !dishType.SAUCE,
                                    });
                                }}
                            />
                            <span>SAUCE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.footerBTNs}>
                <button onClick={HandelMealUpdate}>Save</button>
                <button
                    onClick={closingFunction}
                    aria-label="close"
                    aria-controls="UpdateForm">
                    Close
                </button>
            </div>
        </div>
    );
};

export default MealInfo;
