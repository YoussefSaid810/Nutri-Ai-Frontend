import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./DashboardHome.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faChartArea,
    faIceCream,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { BarChart } from "views/partials/BarChart/BarChart";
import { PieChart } from "views/partials/PieChart/PieChart";
import { CurveChart } from "views/partials/CurveChart/CurveChart";

const DashboardHome = () => {
    const [showSide, setShowSide] = useState(false);
    const [main, showMain] = useState(true);
    const [meal, showMeal] = useState(false);
    const [user, showUser] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => dispatch(logoutUser());
    const USER = useSelector((store) => store.user);

    useEffect(() => {
        if (!USER) nav("/auth/account/login");
        // addEventListener("popstate", (ev) => {
        //     ev.preventDefault();
        //     console.log(ev);
        //     console.log(currentShowState(), showSide);
        // });
    }, [USER]);

    return (
        <Fragment>
            <section className="DashboardHome">
                <div className="rowView">
                    <div className="charCard">
                        <h3 className="headline">System Available Storage</h3>
                        <div className="chart">
                            <PieChart
                                total={50}
                                measure="GB"
                                values={[
                                    {
                                        current: 1,
                                        name: "System files",
                                    },
                                    {
                                        current: 10,
                                        name: "AI-Files",
                                    },
                                    {
                                        current: 3,
                                        name: "images",
                                    },
                                ]}
                                palette={[
                                    [
                                        "var(--theme-color)",
                                        "rgba(var(--theme-color-rgb), 0.9)",
                                    ],
                                    ["#FfA300", "#FCA30090"],
                                    ["#ff0b75", "#c40b7590"],
                                ]}
                            />
                        </div>
                    </div>
                    <div className="charCard">
                        <h3 className="headline">Users login rates</h3>
                        <CurveChart />
                    </div>
                </div>
                <div className="charCard">
                    <h3 className="headline">Top 10 Meals in system</h3>
                    <BarChart />
                </div>
            </section>
        </Fragment>
    );
};

export default DashboardHome;
