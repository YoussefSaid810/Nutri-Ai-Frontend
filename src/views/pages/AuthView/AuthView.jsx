import React, { useEffect, useState, Fragment } from "react";
import {
    Form,
    Link,
    useActionData,
    useNavigate,
    useParams,
} from "react-router-dom";
import bgIMG from "../../../assets/auth/authbg.png";
import { Logo } from "views/partials/Logo/Logo";
import Input from "views/partials/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faApple,
    faFacebookF,
    faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import {
    faAsterisk,
    faEnvelope,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
    email_validation,
    password_confirmation_validation,
    password_validation,
    username_validation,
} from "services/Validation";
import { useDispatch } from "react-redux";
import { setUser } from "store/Reducers/userReducer";
import "./AuthView.css";
import { loadingState } from "store/Reducers/LoadingReducer";

const AuthView = () => {
    const { target } = useParams();
    const dispatch = useDispatch();
    const updateLoading = (state) => dispatch(loadingState(state));

    return (
        <Fragment>
            <section
                className={`auth_view authenticationFRMs ${
                    ("" + target).toLowerCase() === "register"
                        ? "register"
                        : "login"
                }`}>
                <div className="logo">
                    <Link to={"/"}>
                        <Logo size={1} />
                    </Link>
                </div>

                <div className="login">
                    <Login Loading={updateLoading} />
                </div>

                <div
                    className="quote"
                    style={{ backgroundImage: `url(${bgIMG})` }}>
                    <div className="inner">
                        <div
                            className={`txtCont loginTXT ${
                                ("" + target).toLowerCase() === "register"
                                    ? "hide"
                                    : ""
                            }`}>
                            <p>New User ?</p>
                            <p>
                                No problem freely, easily create your account.
                            </p>
                        </div>
                        <div
                            className={`txtCont loginTXT ${
                                ("" + target).toLowerCase() !== "register"
                                    ? "hide"
                                    : ""
                            }`}>
                            <p>Have an account..</p>
                            <p>Then login hurry up and head to your account</p>
                        </div>
                    </div>
                    <Link
                        className={`linker ${
                            ("" + target).toLowerCase() === "register"
                                ? "login"
                                : "register"
                        }`}
                        to={`/auth/account/${
                            ("" + target).toLowerCase() === "register"
                                ? "login"
                                : "register"
                        }`}>
                        <span>Join Us Now</span>
                        <span>Login to your account</span>
                    </Link>
                </div>

                <div className="register">
                    <Register Loading={updateLoading} />
                </div>
            </section>
        </Fragment>
    );
};

const Login = ({ Loading }) => {
    // Redux for user data
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Submit response
     * @return null || {data, error}
     */
    const response = useActionData();
    // handle response and errors
    useEffect(() => {
        Loading(false);
        if (response && response.api === "login") {
            if (!response.error) {
                if (response.status === 203) {
                    navigate(`/auth/verifyEmail/${response.data.id}`, {
                        state: 200,
                    });
                } else if (response.status === 500) {
                    setOtherErrors(
                        "Server can't be reached please try again later"
                    );
                } else {
                    dispatch(setUser(response.data));
                    navigate("/", { state: 200 });
                }
            } else {
                let email_errors = [];
                let password_errors = [];

                if (response.error.data.errors) {
                    response.error.data.errors.forEach((err) => {
                        if (err.path === "email") email_errors.push(err.msg);
                        else if (err.path === "password")
                            password_errors.push(err.msg);
                    });

                    setEmail([email, email_errors]);
                    setPassword([password, password_errors]);
                } else {
                    if (response.error.data.message)
                        setOtherErrors(response.error.data.message);
                    else
                        setOtherErrors(
                            "Server can't be reached please try again later"
                        );
                }
            }
        }
    }, [response]);

    // Form Inputs & inputs errors
    const [[email, emailErr], setEmail] = useState(["", []]);
    const [[password, passwordErr], setPassword] = useState(["", []]);
    const [otherErrors, setOtherErrors] = useState(null);

    const FORM_EVENT = (event) => {
        Loading(true);
        const email_errors = email_validation(email);
        const password_errors = password_validation(password);

        if (email_errors.length != 0 || password_errors.length != 0) {
            event.preventDefault();
            setEmail([email, email_errors]);
            setPassword([password, password_errors]);
            Loading(false);
        }
    };

    return (
        <Fragment>
            <div className="formData">
                <Form
                    method="post"
                    action="/auth/account/login"
                    onSubmit={FORM_EVENT}>
                    <h2>Sign in to NUTRI-AI</h2>

                    <div className="OAUTH">
                        <button type="button">
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faApple} />
                        </button>
                    </div>

                    {otherErrors && (
                        <div className="errorList">
                            <p>{otherErrors}</p>
                        </div>
                    )}

                    <div className="frmINP">
                        <Input
                            id={"loginEmail"}
                            label={"Email"}
                            type={"email"}
                            name={"loginEmail"}
                            autocomplete="email"
                            onChange={(e) => {
                                setEmail([e.target.value, []]);
                            }}
                            icon={faEnvelope}
                        />

                        <div className="errorList">
                            <ul>
                                {emailErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="frmINP">
                        <Input
                            id={"loginPassword"}
                            label={"Password"}
                            type={"password"}
                            name={"loginPassword"}
                            icon={faAsterisk}
                            autocomplete="password"
                            onChange={(e) => {
                                setPassword([e.target.value, []]);
                            }}
                            isPassword
                        />

                        <div className="errorList">
                            <ul>
                                {passwordErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <input type="hidden" name="auth" value={"login"} />

                    <div className="submition">
                        <button type="submit">Sign in</button>
                        <Link to={"/auth/forgetPassword"} type="button">
                            Forgot your password ?
                        </Link>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
};

const Register = ({ Loading }) => {
    // Redux for user data
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Submit response
     * @return null || {data, error}
     */
    const response = useActionData();
    // handle response and errors
    useEffect(() => {
        Loading(false);
        if (response && response.api === "register") {
            if (!response.error) {
                if (response.status === 201) {
                    navigate(`/auth/verifyEmail/${response.data.data.id}`, {
                        state: 200,
                    });
                } else if (response.status === 500) {
                    setOtherErrors(
                        "Server can't be reached please try again later"
                    );
                } else {
                    setOtherErrors(
                        "Something went wrong please try again later"
                    );
                }
            } else {
                let username_errors = [];
                let email_errors = [];
                let password_errors = [];

                if (response.error.data.errors) {
                    response.error.data.errors.forEach((err) => {
                        if (err.path === "email") email_errors.push(err.msg);
                        else if (err.path === "username")
                            username_errors.push(err.msg);
                        else if (err.path === "password")
                            password_errors.push(err.msg);
                    });

                    setUsername([username, username_errors]);
                    setEmail([email, email_errors]);
                    setPassword([password, password_errors]);
                } else {
                    if (response.error.data.message)
                        setOtherErrors(response.error.data.message);
                    else
                        setOtherErrors(
                            "Server can't be reached please try again later"
                        );
                }
            }
        }
    }, [response]);

    // Form Inputs & inputs errors
    const [[username, usernameErr], setUsername] = useState(["", []]);
    const [[email, emailErr], setEmail] = useState(["", []]);
    const [[password, passwordErr], setPassword] = useState(["", []]);
    const [[conf_password, conf_passwordErr], setConf_Password] = useState([
        "",
        [],
    ]);
    const [otherErrors, setOtherErrors] = useState(null);

    const FORM_EVENT = (event) => {
        Loading(true);
        const username_errors = username_validation(username);
        const email_errors = email_validation(email);
        const password_errors = password_validation(password);
        const conf_password_errors = password_confirmation_validation(
            password,
            conf_password
        );

        if (
            email_errors.length !== 0 ||
            password_errors.length !== 0 ||
            username_errors.length !== 0 ||
            conf_password_errors.length !== 0
        ) {
            event.preventDefault();
            setUsername([username, username_errors]);
            setEmail([email, email_errors]);
            setPassword([password, password_errors]);
            setConf_Password([conf_password, conf_password_errors]);
            Loading(false);
        }
    };

    return (
        <Fragment>
            <div className="formData">
                <Form
                    method="post"
                    action="/auth/account/register"
                    onSubmit={FORM_EVENT}>
                    <h2>Join us and start using NUTRI-AI</h2>

                    <div className="OAUTH">
                        <button type="button">
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </button>
                        <button type="button">
                            <FontAwesomeIcon icon={faApple} />
                        </button>
                    </div>

                    {otherErrors && (
                        <div className="errorList">
                            <p>{otherErrors}</p>
                        </div>
                    )}

                    <div className="frmINP">
                        <Input
                            id={"registerUsername"}
                            label={"Name"}
                            name={"registerUsername"}
                            type={"text"}
                            onChange={(e) => {
                                setUsername([e.target.value, []]);
                            }}
                            icon={faUser}
                        />

                        <div className="errorList">
                            <ul>
                                {usernameErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="frmINP">
                        <Input
                            id={"registerEmail"}
                            label={"Email"}
                            type={"email"}
                            name={"registerEmail"}
                            onChange={(e) => {
                                setEmail([e.target.value, []]);
                            }}
                            icon={faEnvelope}
                        />

                        <div className="errorList">
                            <ul>
                                {emailErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="frmINP">
                        <Input
                            id={"registerPassword"}
                            label={"Password"}
                            type={"password"}
                            name={"registerPassword"}
                            onChange={(e) => {
                                setPassword([e.target.value, []]);
                            }}
                            icon={faAsterisk}
                            isPassword
                        />

                        <div className="errorList">
                            <ul>
                                {passwordErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="frmINP">
                        <Input
                            id={"registerConf_Password"}
                            label={"Confirm Password"}
                            type={"password"}
                            name={"conf_password"}
                            onChange={(e) => {
                                setConf_Password([e.target.value, []]);
                            }}
                            icon={faAsterisk}
                            isPassword
                        />

                        <div className="errorList">
                            <ul>
                                {conf_passwordErr.map((err, idx) => (
                                    <li key={idx}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <input type="hidden" name="auth" value={"register"} />

                    <div className="submition">
                        <button className="submit" type="submit">
                            Signup
                        </button>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
};

export default AuthView;
