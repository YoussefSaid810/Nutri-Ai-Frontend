import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getAllFoods } from "services/Food/food";
import { RowCard } from "views/partials/Cards/Cards";
import "./DietHistory.css";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import PlanSection from "views/partials/PlanSection/PlanSection";
import { getUserDailyPlans } from "services/Ai/dailyPlans";

const DietHistory = () => {
    const [userDailyPlans, setUserDailyPlans] = useState([]);

    const myDailyPlans = async () => {
        let res = await getUserDailyPlans();
        if (res && !res.err) {
            let sorted = res.data.sort((a, b) => {
                const dateA = new Date(a.planDate);
                const dateB = new Date(b.planDate);
                return dateB - dateA;
            });
            setUserDailyPlans(sorted);
        } else if (res.err && res.err.response.status === 404) {
            dispatch(
                addNotification({
                    type: "wait",
                    message: res.err.response.data.message,
                })
            );
            setUserDailyPlans(null);
        }
    };

    useEffect(() => {
        myDailyPlans();
    }, []);

    return (
        <Fragment>
            <section className="dietHistory">
                <ProfileTopView />
                <h2>Your dietary history</h2>

                <div className="gridView">
                    {userDailyPlans &&
                        userDailyPlans.length > 0 &&
                        userDailyPlans.map((plan, idx) => (
                            <PlanSection plan={plan} idx={idx + 1} key={idx} />
                        ))}
                </div>
            </section>
        </Fragment>
    );
};

export default DietHistory;
