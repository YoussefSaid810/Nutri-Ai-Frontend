import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./ChatApp.css";
import { useSelector } from "react-redux";
import { ImageView } from "views/partials/ImageView/ImageView";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faPaperPlane,
    faX,
} from "@fortawesome/free-solid-svg-icons";

const ChatApp = () => {
    const USER = useSelector((store) => store.user);
    return (
        <Fragment>
            <section className="ChatApp">
                <div className="ChatHeader">
                    <div className="ChattingInfo">
                        <div className="img">
                            <ImageView src="" preview />
                        </div>
                        <div>
                            <p className="name">Mohammed Atef Ewais</p>
                            <p className="rate">Rate: 0.3 (+100)</p>
                        </div>
                    </div>
                </div>

                <div className="MessageViews">
                    <div className="message receive">
                        <div className="view">
                            <p>Hello my name is mohammed</p>
                        </div>
                    </div>
                    <div className="message sender">
                        <div className="view">
                            <p>
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                            </p>
                        </div>
                    </div>
                    <div className="message receive">
                        <div className="view">
                            <p>Hello my name is mohammed</p>
                        </div>
                    </div>
                    <div className="message sender">
                        <div className="view">
                            <p>
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                            </p>
                        </div>
                    </div>
                    <div className="message receive">
                        <div className="view">
                            <p>Hello my name is mohammed</p>
                        </div>
                    </div>
                    <div className="message receive">
                        <div className="view">
                            <p>Hello my name is mohammed</p>
                        </div>
                    </div>
                    <div className="message sender">
                        <div className="view">
                            <p>
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                            </p>
                        </div>
                    </div>
                    <div className="message sender">
                        <div className="view">
                            <p>
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                                Hello my name is mohammed send Hello my name is
                                mohammed send Hello my name is mohammed send
                            </p>
                        </div>
                    </div>
                </div>

                <div className="SendingControls">
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Write your message"></textarea>
                    <button className="sendBTN">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </section>
        </Fragment>
    );
};

export default ChatApp;
