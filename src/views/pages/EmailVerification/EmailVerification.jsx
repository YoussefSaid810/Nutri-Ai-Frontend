import React, { useState, Fragment } from "react";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Logo } from "views/partials/Logo/Logo";
import { useDispatch } from "react-redux";
import { setUser } from "store/Reducers/userReducer";
import "./EmailVerification.css";
import { loadingState } from "store/Reducers/LoadingReducer";
import OTPInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
import { EmailResend } from "services/Auth/emailResend";
import { EmailVerificationService } from "services/Auth/emailVerification";
import { addNotification } from "store/Reducers/NotificationReducer";

const EmailVerification = () => {
    // Resend Email waiting time
    const WaitingTime = 5;
    const [disableResend, setDisabled] = useState(true);
    let expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + WaitingTime);
    const { seconds, restart } = useTimer({
        expiryTimestamp,
        onExpire: () => setDisabled(false),
    });

    // Main site Controllers
    const { id } = useParams();
    const [code, setCode] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();
    const dispatch = useDispatch();
    const updateLoading = (state) => dispatch(loadingState(state));

    const resend_Email = async () => {
        setSuccess("");
        setError("");
        updateLoading(true);
        let response = await EmailResend(id);

        if (response.status === 200)
            setSuccess("Email has been sent successfully");
        else if (response.status < 500) setError(response.error);
        else setError("Server can't be reached");

        // Reset timer
        let expiryTimestamp = new Date();
        expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + WaitingTime);
        setDisabled(true);
        restart(expiryTimestamp);
        updateLoading(false);
    };

    const VerifyCode = async (event) => {
        event.preventDefault();
        setError("");
        updateLoading(true);

        const response = await EmailVerificationService(id, code);
        if (response.status === 200) {
            dispatch(setUser(response.data));
            nav("/profile/settings/information");
            dispatch(
                addNotification({
                    message: "provide your information to get best experience",
                    type: "info",
                })
            );
        } else if (response.status === 400) {
            let viewErrs = [];
            response.error.data.errors.forEach((err) => {
                viewErrs.push(<li>{err.msg}</li>);
            });

            setError(viewErrs);
        }

        updateLoading(false);
    };

    return (
        <Fragment>
            <section className={`auth_view VerifyEmail`}>
                <div className="logo">
                    <Link to={"/"}>
                        <Logo size={2} />
                    </Link>
                </div>

                <div className="verificationEmailForm">
                    <div>
                        <Form onSubmit={VerifyCode}>
                            <h2>Verify Your Email</h2>

                            <p>
                                An email with 8 characters has been sent to you,
                                please verify it to start using our free AI
                            </p>

                            {success !== "" && (
                                <div className="errorList success">
                                    <p>{success}</p>
                                </div>
                            )}
                            {error !== "" && (
                                <div className="errorList">
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="frmINP">
                                <OTPInput
                                    value={code}
                                    onChange={setCode}
                                    numInputs={8}
                                    placeholder="xxxxxxxx"
                                    containerStyle={"otpCont"}
                                    inputStyle={"otpINP"}
                                    renderInput={(props) => (
                                        <input {...props} />
                                    )}
                                    shouldAutoFocus
                                />
                            </div>

                            <input type="hidden" name="id" value={id} />
                            <input type="hidden" name="code" value={code} />

                            <div className="submission">
                                <button type="submit">Activate</button>
                                <button
                                    className={`resend ${
                                        disableResend ? "disabled" : ""
                                    }`}
                                    type="button"
                                    onClick={resend_Email}>
                                    <span>({seconds})</span> resend code
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};
export default EmailVerification;
