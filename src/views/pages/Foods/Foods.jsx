import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./Foods.css";
import Headline from "views/partials/Headline/Headline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "views/partials/Cards/Cards";
import CoursesGrid from "views/partials/CoursesGrid/CoursesGrid";
import { getAllFoods } from "services/Food/food";
import { useSearchParams } from "react-router-dom";
import SliderConfigurations from "Configs/SliderConfigurations";
import Waiting from "views/partials/Waiting/Waiting";

const Foods = () => {
    const TotalPerPage = 32;
    const [searchParams, _] = useSearchParams();
    const [foods, setFoods] = useState([]);
    const [fetchingMeals, setFetchingMealsData] = useState(false);
    const [total, setTotal] = useState(1);
    let pIDX = searchParams.get("page");
    let [page_index, setPageIDX] = useState(pIDX || 1);

    const fetchFoods = async (pidx) => {
        setFetchingMealsData(true);
        let res = await getAllFoods(pidx, TotalPerPage);
        if (res && !res.err) {
            setFoods(res.data.data);
            if (!total.length)
                setTotal(Math.ceil(res.data.total / TotalPerPage));
        }
        setFetchingMealsData(false);
    };

    useEffect(() => {
        fetchFoods(page_index);
    }, [pIDX]);

    return (
        <Fragment>
            {foods.length === 0 && fetchingMeals && (
                <div className="waitingScreenView">
                    <Waiting />
                </div>
            )}
            {!fetchingMeals && (
                <section className="courses">
                    {foods.length ? (
                        <section className="leading">
                            <Headline
                                headline={"The most popular meals"}
                                quote={
                                    "whatever you are looking for .. it will be found here"
                                }
                            />

                            <div className="courseSlider">
                                <Slider {...SliderConfigurations}>
                                    {foods.map((food, idx) => (
                                        <div className="slide" key={idx}>
                                            <Card
                                                data={food}
                                                index={idx}
                                                key={idx}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </section>
                    ) : (
                        ""
                    )}

                    {foods.length ? (
                        <section className="Foryou">
                            <Headline
                                headline={"You may like"}
                                quote={
                                    "Meal that has been chosen for you by NUTRI-AI"
                                }
                            />

                            <div className="courseSlider">
                                <Slider {...SliderConfigurations}>
                                    {foods.map((food, idx) => (
                                        <div className="slide" key={idx}>
                                            <Card data={food} index={idx} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </section>
                    ) : (
                        ""
                    )}

                    <section className="grid">
                        <Headline
                            headline={"All our meals"}
                            quote={
                                "more? you can search between the whole list of our meals"
                            }
                        />

                        <div className="allCourses">
                            <CoursesGrid
                                foods={foods}
                                total={total}
                                curIDX={page_index}
                                setPageIDX={setPageIDX}
                                fetchFoods={fetchFoods}
                            />
                        </div>
                    </section>
                </section>
            )}
        </Fragment>
    );
};

export default Foods;
