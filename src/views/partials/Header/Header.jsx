import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./Header.css";
import {
    Form,
    Link,
    NavLink,
    useActionData,
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Supported_Langs, changeLang } from "store/Reducers/LangReducer";
import { toggleTheme } from "store/Reducers/ThemeReducer";
import { Logo } from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { logoutUser, setUser } from "store/Reducers/userReducer";

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const lang = useSelector((store) => store.lang);
    const t = useSelector((store) => store.translate);

    const translate = (key) => {
        try {
            return t[key][lang.idx];
        } catch (err) {
            return key;
        }
    };

    useEffect(() => {
        document.removeEventListener("popstate", closeNavbar);
        document.addEventListener("popstate", closeNavbar);

        return () => {
            document.removeEventListener("popstate", closeNavbar);
        };
    }, [showNav]);

    const closeNavbar = () => {
        if (showNav) setShowNav(false);
    };

    return (
        <Fragment>
            <header>
                <nav>
                    <div className="logo">
                        <h1>
                            <Link to={"/"}>
                                <Logo size={1.5} />
                            </Link>
                        </h1>
                    </div>

                    <div
                        className={`overlay ${showNav ? "show" : " "}`}
                        onClick={() => {
                            setShowNav(false);
                        }}></div>

                    <div className={`links ${showNav ? "show" : ""}`}>
                        <ul>
                            <li>
                                <NavLink to={`/`}>{translate("home")}</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/meals`}>
                                    {translate("meals")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/calculator`}>
                                    {translate("calc")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/about-us`}>
                                    {translate("aboutus")}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={`/faqs`}>
                                    {translate("faqs")}
                                </NavLink>
                            </li>
                        </ul>

                        {User(0)}
                    </div>

                    {User(10)}

                    <div className="navBTN">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowNav(true);
                            }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                viewBox="0 0 24 24"
                                fill="none">
                                <path d="M5 12H20" stroke="currentColor" />
                                <path d="M5 17H20" stroke="currentColor" />
                                <path d="M5 7H20" stroke="currentColor" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>
        </Fragment>
    );
};

const User = () => {
    // Check for logout response
    const response = useActionData();
    const navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        if (response) {
            navigate("/", { state: 200 });
            dispatch(setUser(null));
        }
    }, [response]);

    let isDark = useSelector((store) => store.theme);
    let lang = useSelector((store) => store.lang);
    let user = useSelector((store) => store.user);
    const t = useSelector((store) => store.translate);

    const translate = (key) => {
        try {
            return t[key][lang.idx];
        } catch (err) {
            return key;
        }
    };

    return (
        <Fragment>
            {user ? (
                <div className="user">
                    <ul>
                        <li>
                            <div>
                                <p>{user.name}</p>

                                <span>
                                    <svg
                                        viewBox="-2.4 -2.4 28.80 28.80"
                                        width="2em"
                                        height="2em"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            stroke="currentColor"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M12 14.5C11.9015 14.5005 11.8038 14.4813 11.7128 14.4435C11.6218 14.4057 11.5392 14.3501 11.47 14.28L8 10.78C7.90861 10.6391 7.86719 10.4715 7.88238 10.3042C7.89756 10.1369 7.96848 9.97954 8.08376 9.85735C8.19904 9.73515 8.352 9.65519 8.51814 9.63029C8.68428 9.6054 8.85396 9.63699 9 9.72003L12 12.72L15 9.72003C15.146 9.63699 15.3157 9.6054 15.4819 9.63029C15.648 9.65519 15.801 9.73515 15.9162 9.85735C16.0315 9.97954 16.1024 10.1369 16.1176 10.3042C16.1328 10.4715 16.0914 10.6391 16 10.78L12.5 14.28C12.3675 14.4144 12.1886 14.4931 12 14.5Z"
                                                fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <ul>
                                <li>
                                    <NavLink to={`/profile`}>
                                        {translate("profile")}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile/history">
                                        {translate("Meals history")}
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            dispatch(toggleTheme(!isDark));
                                        }}>
                                        {isDark
                                            ? translate("lightmode")
                                            : translate("darkmode")}
                                    </button>
                                </li>
                                <li>
                                    <NavLink to="/profile/settings">
                                        {translate("Settings")}
                                    </NavLink>
                                </li>
                                {user.role === "ADMIN" && (
                                    <li>
                                        <NavLink to="/admin/home">
                                            Admin control panel
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={() => {
                                            dispatch(logoutUser());
                                        }}>
                                        {translate("logout")}
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="user">
                    <div className="authBTNs">
                        <button
                            onClick={() => {
                                dispatch(toggleTheme(!isDark));
                            }}>
                            <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
                        </button>
                        <Link to={"/auth/account/login"}>Login</Link>
                        <Link to={"/auth/account/register"}>Join us</Link>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Header;
