import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./UpdateAccount.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Input from "views/partials/Input/Input";
import { logoutUser, setUser } from "store/Reducers/userReducer";
import { loadingState } from "store/Reducers/LoadingReducer";
import { addNotification } from "store/Reducers/NotificationReducer";
import Loading from "views/partials/Loading/Loading";
import ImageEditor from "views/partials/ImageEditor/ImageEditor";
import { username_validation } from "services/Validation";
import { UpdateAccountService } from "services/User/UpdateAccountService";

const [MIN, MAX] = [0.5, 1.5];

const UpdateAccount = () => {
    const nav = useNavigate();
    const USER = useSelector((store) => store.user);
    const [errView, setErrView] = useState({
        name: [],
        else: [],
    });
    const [name, setName] = useState(USER.name);
    const [file, setFile] = useState(null);
    const [props, setProps] = useState(null);
    const dispatch = useDispatch();

    const FORM_EVENT = (event) => {
        event.preventDefault();
        let nameValidation = username_validation(name);
        setErrView((errs) => ({ ...errs, name: nameValidation }));

        if (nameValidation.length === 0)
            uploadData({
                name,
                file,
                props,
            });
    };

    const uploadData = async (data) => {
        const fd = new FormData();
        fd.append("name", data.name);
        fd.append("image", data.file);
        fd.append("properties", JSON.stringify(data.props));

        dispatch(loadingState(true));
        const response = await UpdateAccountService(fd);
        if (response.status === 200) {
            dispatch(setUser(response.data));
            dispatch(
                addNotification({
                    message: "User Data has been updated successfully",
                    type: "success",
                })
            );
        } else {
            dispatch(
                addNotification({
                    message:
                        "Something went wrong while updating your data, please try again later",
                    type: "fail",
                })
            );
        }
        dispatch(loadingState(false));
    };

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
                    action="./">
                    <div className="inputsContainer">
                        <div>
                            <ImageEditor
                                fileSetter={setFile}
                                propsSetter={setProps}
                            />
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"text"}
                                label={"name"}
                                name={"name"}
                                bgColor={"transparent"}
                                pre={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            {errView.name && (
                                <div className="errorList">
                                    {errView.name.length !== 0 && (
                                        <ul>
                                            {errView.name.map((err, idx) => (
                                                <li key={idx}>{err}</li>
                                            ))}
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
            </div>
        </Fragment>
    );
};

export default UpdateAccount;
