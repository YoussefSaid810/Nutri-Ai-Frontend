import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./UpdateInformation.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileTopView from "views/partials/ProfileTopView/ProfileTopView";
import { Form, useActionData } from "react-router-dom";
import Input from "views/partials/Input/Input";
import Selector from "views/partials/Selector/Selector";
import { activity_values, goal_values } from "../../../../../Configs/constants";
import { updateInformation } from "store/Reducers/userReducer";
import { loadingState } from "store/Reducers/LoadingReducer";
import { addNotification } from "store/Reducers/NotificationReducer";
import Loading from "views/partials/Loading/Loading";

const UpdateInformation = () => {
    const USER_INFO = useSelector((store) => store.user.information);
    const response = useActionData();

    // Inputs States
    const [errView, setErrView] = useState({
        height: null,
        weight: null,
        age: null,
        else: [],
    });

    const [weight, setWeight] = useState(USER_INFO.weight);
    const [height, setHeight] = useState(USER_INFO.height);
    const [activity, setActivity] = useState(USER_INFO.activity);
    const [gender, setGender] = useState(USER_INFO.gender);
    const [goal, setGoal] = useState(USER_INFO.goal);
    const [age, setAge] = useState(USER_INFO.age);
    const dispatch = useDispatch();

    const FORM_EVENT = (event) => {
        if (errView.height || errView.age || errView.weight)
            event.preventDefault();
        else dispatch(loadingState(true));
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                dispatch(updateInformation(response.data));
                dispatch(
                    addNotification({
                        message:
                            "User information has been updated successfully",
                        type: "success",
                    })
                );
            } else if (response.status === 400) {
                setErrView((err) => {
                    err.else = response.error.data.errors.map(
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
                {(errView.height || errView.age || errView.weight) && (
                    <div className="errorList">
                        <ul>
                            {errView.height && <li>{errView.height}</li>}
                            {errView.weight && <li>{errView.weight}</li>}
                            {errView.age && <li>{errView.age}</li>}
                            {errView.else.length !== 0 &&
                                errView.else.map((err) => <li>{err}</li>)}
                        </ul>
                    </div>
                )}
                <Form
                    className="UpdateUserInfo"
                    onSubmit={FORM_EVENT}
                    method="put"
                    action="/profile/settings/information">
                    <div className="inputsContainer">
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"Height"}
                                name={"height"}
                                post={"CM"}
                                min={3}
                                max={300}
                                pre={USER_INFO.height}
                                value={USER_INFO.height}
                                errViewer={setErrView}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"weight"}
                                name={"weight"}
                                post={"KG"}
                                min={40}
                                max={300}
                                pre={USER_INFO.weight}
                                value={USER_INFO.weight}
                                errViewer={setErrView}
                                bgColor={"transparent"}
                                onChange={(event) =>
                                    setWeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="frmInput">
                            <Input
                                type={"number"}
                                label={"Age"}
                                name={"age"}
                                post={"YR"}
                                min={7}
                                max={150}
                                pre={USER_INFO.age}
                                value={USER_INFO.age}
                                bgColor={"transparent"}
                                errViewer={setErrView}
                                onChange={(event) => setAge(event.target.value)}
                            />
                        </div>
                        <div className="frmInput">
                            <Selector
                                name={"goal"}
                                values={goal_values}
                                onChange={(value) => {
                                    setGoal(value);
                                }}
                                selected={goal}
                                bgColor={"inherit"}
                                color={"inherit"}
                                border={"none"}
                            />
                        </div>
                        <div className="frmInput">
                            <Selector
                                name={"activity"}
                                values={activity_values}
                                onChange={(value) => {
                                    setActivity(value);
                                }}
                                selected={activity}
                                bgColor={"inherit"}
                                color={"inherit"}
                                border={"none"}
                            />
                        </div>
                        <div className="frmInput genderSelector">
                            <div className="genderInput">
                                <input
                                    name="gender"
                                    type="radio"
                                    checked={gender == "MALE"}
                                    onChange={() => {}}
                                    onClick={(e) => {
                                        setGender("MALE");
                                    }}
                                    value={"MALE"}
                                />
                                <span>Male</span>
                            </div>
                            <div className="genderInput">
                                <input
                                    name="gender"
                                    type="radio"
                                    checked={gender == "FEMALE"}
                                    onChange={() => {}}
                                    onClick={(e) => {
                                        if (e.target.checked)
                                            setGender("FEMALE");
                                    }}
                                    value={"FEMALE"}
                                />
                                <span>Female</span>
                            </div>
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

export default UpdateInformation;
