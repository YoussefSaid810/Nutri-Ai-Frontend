import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./DashboardLayout.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faChartArea,
    faIceCream,
    faUser,
    faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "views/partials/Loading/Loading";

const DashboardLayout = () => {
    const [showSide, setShowSide] = useState(false);
    const [main, showMain] = useState(true);
    const [meal, showMeal] = useState(false);
    const [user, showUser] = useState(false);
    const [admin, showAdmin] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const USER = useSelector((store) => store.user);

    useEffect(() => {
        if (!USER) nav("/auth/account/login");
        else if (USER.role !== "ADMIN") nav("/profile");
    }, [USER]);

    return (
        <Fragment>
            <section className="DashboardLayout">
                <aside className={showSide ? "show" : ""}>
                    <div className={`controlView ${main && "show"}`}>
                        <button
                            type="button"
                            onClick={() => {
                                showMain(!main);
                            }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faChartArea} />
                            </span>
                            <span className="text">Main States</span>
                            <span className="dropIcon icon">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </button>

                        <ul className="view">
                            <li>
                                <NavLink to={"/admin/home"}>Dashboard</NavLink>
                            </li>
                        </ul>
                    </div>

                    <div
                        className={`controlView ${meal && "show"}`}
                        role="alertdialog"
                        aria-modal="true">
                        <button
                            type="button"
                            onClick={() => {
                                showMeal(!meal);
                            }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faIceCream} />
                            </span>
                            <span className="text">Meals</span>
                            <span className="dropIcon icon">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </button>

                        <ul className="view">
                            <li>
                                <NavLink to={"/admin/meals/0"}>
                                    List Meals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/admin/meals/new"}>
                                    Add New Meal
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={`controlView ${user && "show"}`}>
                        <button
                            type="button"
                            onClick={() => {
                                showUser(!user);
                            }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                            <span className="text">Users</span>
                            <span className="dropIcon icon">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </button>

                        <ul className="view">
                            <li>
                                <NavLink to={"/admin/users"}>
                                    List Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/admin/users/blocked"}>
                                    Blocked Users
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={`controlView ${admin && "show"}`}>
                        <button
                            type="button"
                            onClick={() => {
                                showAdmin(!admin);
                            }}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faUserEdit} />
                            </span>
                            <span className="text">Admins</span>
                            <span className="dropIcon icon">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </span>
                        </button>

                        <ul className="view">
                            <li>
                                <NavLink to={"/admin/users"}>
                                    List Admin
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/admin/users/blocked"}>
                                    Add New Admin
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <button
                        className="viewBTN"
                        onClick={() => setShowSide(!showSide)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </aside>

                <div className="DashboardContent">
                    <Outlet></Outlet>
                </div>
            </section>
        </Fragment>
    );
};

export default DashboardLayout;
