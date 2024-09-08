import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./ProfilePreferences.css";
import { useSelector } from "react-redux";
import SliderConfigurations from "Configs/SliderConfigurations";
import { getAllFoods } from "services/Food/food";
import Card, { RowCard } from "views/partials/Cards/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";

const ProfilePreferences = () => {
    const USER = useSelector((store) => store.user);

    const [foods, setFoods] = useState([]);

    const fetchFoods = async () => {
        let res = await getAllFoods(0, 10);
        if (res && !res.err) {
            setFoods(res.data.data);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <Fragment>
            <ProfileTopView />
            {USER && (
                <section className="profilePreferences">
                    <div className="suggestions">
                        <h2>Meals that you may like</h2>
                        {foods.length && (
                            <div className="courseSlider">
                                <Slider
                                    {...SliderConfigurations}
                                    slidesToShow={4}>
                                    {foods.length !== 0 &&
                                        foods.map((food, idx) => (
                                            <div className="slide" key={idx}>
                                                <Card data={food} index={idx} />
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                        )}
                    </div>

                    <div className="preferences">
                        <h2>Your preferences</h2>
                        <div className="gridView">
                            {USER.preferences.map((food, idx) => (
                                <Card data={food} key={idx} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default ProfilePreferences;
