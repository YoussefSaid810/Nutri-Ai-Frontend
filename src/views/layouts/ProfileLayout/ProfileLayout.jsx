import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./ProfileLayout.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "store/Reducers/userReducer";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const ProfileLayout = () => {
    const [showSide, setShowSide] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => dispatch(logoutUser());
    const USER = useSelector((store) => store.user);

    useEffect(() => {
        if (!USER) nav("/auth/account/login");
    }, [USER]);

    return (
        <Fragment>
            <section className="ProfileLayout">
                <aside className={showSide ? "show" : ""}>
                    <div className="userProfile">
                        <div className="sectionTag">Personal & Connections</div>
                        <ul>
                            <li>
                                <NavLink to={"/profile/account"}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile/preferences"}>
                                    Preferences
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile/history"}>
                                    Meals History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile/settings"}>
                                    Settings
                                </NavLink>
                            </li>
                            {USER && USER.role === "ADMIN" && (
                                <li>
                                    <NavLink to={"/admin"}>
                                        Admin Control Panel
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to={"/"} onClick={Logout}>
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className="userServices">
                        <div className="sectionTag">Services</div>
                        <ul>
                            <li>
                                <NavLink to={"/profile/rank_my_meals"}>
                                    AI-Generate a diet
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile/chat"}>
                                    Communicate with a trainer
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/profile/suggestions"}>
                                    Meals that you may like
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

                <div className="profileContent">
                    {USER && <Outlet></Outlet>}
                </div>
            </section>
        </Fragment>
    );
};

export default ProfileLayout;
