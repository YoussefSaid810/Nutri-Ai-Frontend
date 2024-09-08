import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./UpdatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Input from "views/partials/Input/Input";
import Selector from "views/partials/Selector/Selector";
import { activity_values, goal_values } from "../../../../../Configs/constants";
import { logoutUser, updateInformation } from "store/Reducers/userReducer";
import { loadingState } from "store/Reducers/LoadingReducer";
import { addNotification } from "store/Reducers/NotificationReducer";
import Loading from "views/partials/Loading/Loading";
import {
    password_confirmation_validation,
    password_validation,
} from "services/Validation";

const UpdatePassword = () => {
    const response = useActionData();
    const nav = useNavigate();

    // Inputs States
    const [errView, setErrView] = useState({
        oldPassword: [],
        newPassword: [],
        confirm_Password: [],
        else: [],
    });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirm_Password, setConfPassword] = useState("");
    const dispatch = useDispatch();

    const FORM_EVENT = (event) => {
        // 1- Validate Inputs
        let vd_oldPassword = password_validation(oldPassword, true);
        let vd_newPassword = password_validation(newPassword, true);
        let vd_confirm_Password = password_confirmation_validation(
            newPassword,
            confirm_Password
        );

        // 2- check for validation values
        if (
            vd_oldPassword.length !== 0 ||
            vd_newPassword.length !== 0 ||
            vd_confirm_Password.length !== 0
        ) {
            event.preventDefault();
            // set errors
            setErrView({
                oldPassword: vd_oldPassword,
                newPassword: vd_newPassword,
                confirm_Password: vd_confirm_Password,
                else: errView.else,
            });
        } else dispatch(loadingState(true));
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                dispatch(logoutUser());
                nav("/auth/account/login");
                dispatch(
                    addNotification({
                        message: "User password has been updated successfully",
                        type: "success",
                    })
                );
            } else if (response.status === 400) {
                setErrView((err) => {
                    err.else = response.error.errors.map(
                        (err) => `${err.path}: ${err.msg}`
                    );
                    return err;
                });
            } else {
                dispatch(
                    addNotification({
                        message: response.error,
                        type: "fail",
                    })
                );
            }
            dispatch(loadingState(false));
        }
    }, [response]);

    return (
        <Fragment>
            <ProfileTopView />
            <div className="updateForm">
                {errView.else && (
                    <div className="errorList">
                        {errView.else.length !== 0 && (
                            <ul>
                                {errView.else.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                <Form
                    className="updatePasswordForm"
                    onSubmit={FORM_EVENT}
                    method="put"
                    action="/profile/settings/changePassword">
                    <div className="inputsContainer">
                        <div className="frmInput">
                            <Input
                                type={"password"}
                                label={"old password"}
                                name={"old_password"}
                                isPassword={true}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setOldPassword(event.target.value)
                                }
                            />
                            {errView.oldPassword && (
                                <div className="errorList">
                                    {errView.oldPassword.length !== 0 && (
                                        <ul>
                                            {errView.oldPassword.map(
                                                (err, idx) => (
                                                    <li key={idx}>{err}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"password"}
                                label={"new password"}
                                name={"new_password"}
                                isPassword={true}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setNewPassword(event.target.value)
                                }
                            />
                            {errView.newPassword && (
                                <div className="errorList">
                                    {errView.newPassword.length !== 0 && (
                                        <ul>
                                            {errView.newPassword.map(
                                                (err, idx) => (
                                                    <li key={idx}>{err}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"password"}
                                label={"confirm password"}
                                name={"confirm_password"}
                                isPassword={true}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setConfPassword(event.target.value)
                                }
                            />
                            {errView.confirm_Password && (
                                <div className="errorList">
                                    {errView.confirm_Password.length !== 0 && (
                                        <ul>
                                            {errView.confirm_Password.map(
                                                (err, idx) => (
                                                    <li key={idx}>{err}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="ActionBTN">
                        <button type="submit">save</button>
                    </div>
                </Form>

                <Loading />
            </div>
        </Fragment>
    );
};

export default UpdatePassword;
