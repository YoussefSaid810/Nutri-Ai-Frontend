import React from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MainLayout.css";
import Header from "views/partials/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "views/partials/Footer/Footer";
import { removeNotification } from "store/Reducers/NotificationReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faX } from "@fortawesome/free-solid-svg-icons";
import { closePreviewer } from "store/Reducers/ImageReducer";
import Loading from "views/partials/Loading/Loading";

const MainLayout = () => {
    let isDark = useSelector((store) => store.theme);
    let lang = useSelector((store) => store.lang);
    let loading = useSelector((store) => store.loading);
    let notifies = useSelector((store) => store.notification);
    let PreviewedIMG = useSelector((store) => store.imagePreviewer);
    let dispatch = useDispatch();

    const closeImagePreviewer = () => dispatch(closePreviewer());
    return (
        <Fragment>
            <main className={isDark ? "dark" : ""} dir={lang.dir}>
                <Header />
                <section className="content">
                    <div className="inner">
                        <Outlet />
                    </div>

                    <Loading LoadState={loading} />

                    <Footer />

                    <div className="responsesMSGs">
                        {notifies.map((nt, idx) => {
                            let timeRun = setTimeout(() => {
                                dispatch(removeNotification(nt.id));
                            }, nt.duration);
                            return (
                                <div
                                    className={nt.type}
                                    key={idx}
                                    onClick={() => {
                                        dispatch(removeNotification(nt.id));
                                        clearTimeout(timeRun);
                                    }}>
                                    <p>{nt.message}</p>
                                </div>
                            );
                        })}
                    </div>

                    {PreviewedIMG && (
                        <div className="imgPreviewer">
                            <button onClick={closeImagePreviewer}>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <div
                                onClick={closeImagePreviewer}
                                className="overlay"></div>
                            <img src={PreviewedIMG} alt="img previewer" />
                        </div>
                    )}
                </section>
            </main>
        </Fragment>
    );
};

export default MainLayout;
