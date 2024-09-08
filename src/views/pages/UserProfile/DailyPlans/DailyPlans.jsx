import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./DailyPlans.css";
import { getUserDailyPlans } from "services/Ai/dailyPlans";
import PlanSection from "views/partials/PlanSection/PlanSection";
import { addNotification } from "store/Reducers/NotificationReducer";
import { useDispatch } from "react-redux";

const DailyPlans = ({ userDailyPlansData }) => {
    const dispatch = useDispatch();
    const [userDailyPlans, setUserDailyPlans] = useState(userDailyPlansData);

    useEffect(() => {
        const myDailyPlans = async () => {
            let res = await getUserDailyPlans();
            if (res && !res.err) {
                let sorted = res.data.sort((a, b) => {
                    const dateA = new Date(a.planDate);
                    const dateB = new Date(b.planDate);
                    return dateB - dateA;
                });
                setUserDailyPlans(sorted);
            } else if (res.err.status === 401) {
                dispatch(
                    addNotification({
                        type: "wait",
                        message: res.err,
                    })
                );
            } else {
                dispatch(
                    addNotification({
                        type: "fail",
                        message: res.err,
                    })
                );
            }
        };

        myDailyPlans();
    }, []);
    return (
        <Fragment>
            <div className="viewPlan">
                {userDailyPlans &&
                    userDailyPlans.length > 0 &&
                    userDailyPlans.map((plan, idx) => (
                        <PlanSection plan={plan} idx={idx + 1} key={idx} />
                    ))}
            </div>
        </Fragment>
    );
};

export default DailyPlans;
