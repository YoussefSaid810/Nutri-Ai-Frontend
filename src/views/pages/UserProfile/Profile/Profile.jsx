import React from "react";
import { Fragment } from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { activity_values, getIDX, goal_values } from "Configs/constants";

const Profile = () => {
    const USER = useSelector((store) => store.user);

    return (
        <Fragment>
            <ProfileTopView />
            {USER && (
                <section className="profile">
                    <h2>User Information</h2>
                    <div className="userInformation">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Gender</th>
                                    <td>{USER.information.gender}</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>
                                        {USER.information.age} <span>year</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Height</th>
                                    <td>
                                        {USER.information.height}{" "}
                                        <span>cm</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Weight</th>
                                    <td>
                                        {USER.information.weight}{" "}
                                        <span>kg</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Goal</th>
                                    <td>
                                        {
                                            goal_values[
                                                getIDX(
                                                    goal_values,
                                                    USER.information.goal,
                                                    "value"
                                                )
                                            ].view
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th>Activity</th>
                                    <td>
                                        {
                                            activity_values[
                                                getIDX(
                                                    activity_values,
                                                    USER.information.activity,
                                                    "value"
                                                )
                                            ].view
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default Profile;
