import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import header_img from "assets/Character/Hello.png";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPaperPlane,
    faIceCream,
    faUser,
    faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
import Headline from "views/partials/Headline/Headline";
import Input from "views/partials/Input/Input";
import { useSelector } from "react-redux";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { HomeAnimation } from "../../../Configs/AnimationVariances";
const Home = () => {
    const board = useSelector((store) => store.board);
    const lang = useSelector((store) => store.lang);
    const t = useSelector((store) => store.translate);
    const USER = useSelector((store) => store.user);

    const translate = (key) => {
        try {
            return t[key][lang.idx];
        } catch (err) {
            return key;
        }
    };

    return (
        <Fragment>
            <motion.section
                initial="hidden"
                animate="visible"
                exit="exit"
                className="home">
                <section className="header">
                    <div className="start">
                        <motion.h2 variants={HomeAnimation.headline}>
                            {translate("title")}
                        </motion.h2>
                        <motion.p variants={HomeAnimation.text}>
                            {translate("sub1")}
                        </motion.p>
                        <motion.p variants={HomeAnimation.text}>
                            {translate("sub2")}
                        </motion.p>
                        <div className="links">
                            <motion.div
                                style={{ display: "inline-block" }}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                variants={HomeAnimation.button}>
                                <Link
                                    to={
                                        !USER
                                            ? "auth/account/register"
                                            : "profile/rank_my_meals"
                                    }>
                                    Generate your meal now
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <motion.div variants={HomeAnimation.img} className="end">
                        <img
                            src={header_img}
                            className="headIMG"
                            alt="header_img"
                        />
                        <div className="shadow"></div>
                    </motion.div>
                </section>

                <LazyMotion features={domAnimation}>
                    <section className="counters">
                        <motion.div
                            variants={HomeAnimation.popUpCard}
                            className="counter">
                            <div>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faIceCream} />
                                </span>
                            </div>
                            <div>
                                <p className="num">+2000</p>
                                <p className="type">{translate("food")}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={HomeAnimation.popUpCard}
                            className="counter">
                            <div>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </div>
                            <div>
                                <p className="num">+300</p>
                                <p className="type">{translate("user")}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            variants={HomeAnimation.popUpCard}
                            className="counter">
                            <div>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faDumbbell} />
                                </span>
                            </div>
                            <div>
                                <p className="num">+50</p>
                                <p className="type">{translate("trainer")}</p>
                            </div>
                        </motion.div>
                    </section>
                </LazyMotion>

                {/* <section className="helperVideo">
                    <Headline headline={"How to use Nutri-ai"} />

                    <video controls>
                        <source
                            src="https://drive.google.com/uc?export=download&id=14E0tqSDc6eIDKgITlgK6F6_-z-T1UlTa"
                            type="video/mp4"
                        />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                </section> */}

                <section className="contact">
                    <Headline
                        headline={translate("contactus")}
                        quote={translate("contactQaute")}
                    />
                    <form>
                        <Input
                            label={translate("name")}
                            name={"name"}
                            type={"text"}
                            idx={1}
                        />
                        <Input
                            label={translate("email")}
                            name={"email"}
                            type={"email"}
                            idx={2}
                        />
                        <Input
                            label={translate("phone")}
                            name={"phone"}
                            type={"tel"}
                            idx={3}
                        />
                        <Input
                            label={translate("message")}
                            name={"message"}
                            type={"text_area"}
                            idx={4}
                        />

                        <div className="submition">
                            <button className="send" type="submit">
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </span>
                                {translate("send")}
                            </button>
                        </div>
                    </form>
                </section>
            </motion.section>
        </Fragment>
    );
};

export default Home;
