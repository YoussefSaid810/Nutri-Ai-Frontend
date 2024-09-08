import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./ProfileSettings.css";
import { useSelector } from "react-redux";
import SliderConfigurations from "Configs/SliderConfigurations";
import { getAllFoods } from "services/Food/food";
import Card, { RowCard } from "views/partials/Cards/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLock,
    faUser,
    faUserAlt,
    faUserLock,
} from "@fortawesome/free-solid-svg-icons";

const ProfileSettings = () => {
    return (
        <Fragment>
            <ProfileTopView />
            <div className="TableView">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <Link to={"./information"}>
                                    <span>
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    user information
                                </Link>
                            </th>
                            <td>
                                <div>
                                    <Link to={"./information"}>
                                        update user information
                                    </Link>
                                    <p>
                                        Keep your information up to date so our
                                        AI would be able to track your progress
                                        and provide a better experience.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Link to={"./accountInformation"}>
                                    <span>
                                        <FontAwesomeIcon icon={faUserLock} />
                                    </span>
                                    Account information
                                </Link>
                            </th>
                            <td>
                                <div>
                                    <Link to={"./accountInformation"}>
                                        update account information
                                    </Link>
                                    <p>
                                        You can update your information such
                                        like profile image, name ..etc.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Link to={"./changePassword"}>
                                    <span>
                                        <FontAwesomeIcon icon={faLock} />
                                    </span>
                                    Account Security
                                </Link>
                            </th>
                            <td>
                                <div>
                                    <Link to={"./changePassword"}>
                                        update or reset your password
                                    </Link>
                                    <p>
                                        Provide a hard password and don't share
                                        with others.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default ProfileSettings;
