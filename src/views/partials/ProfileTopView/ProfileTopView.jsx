import React, { Fragment, useEffect } from "react";
import profileBG from "../../../assets/Profile/profileBG.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ImageView } from "../ImageView/ImageView";
import "./ProfileTopView.css";
import { addNotification } from "store/Reducers/NotificationReducer";
import { useNavigate } from "react-router-dom";

export const ProfileTopView = () => {
    const USER = useSelector((store) => store.user);
    const nav = useNavigate();
    const dispatch = useDispatch();

    const copyID = (id) => {
        navigator.clipboard.writeText(id);
        dispatch(
            addNotification({
                message: "ID has copied",
                type: "success",
            })
        );
    };

    useEffect(() => {
        if (!USER) nav("/auth/account/login");
    }, [USER]);

    return (
        <Fragment>
            {USER && (
                <div className="topInformation">
                    <div
                        className="bgIMG"
                        style={{
                            backgroundImage: `url('${profileBG}')`,
                        }}></div>

                    <div className="userInfos">
                        <ImageView src={USER.image} preview={true} />
                        <div className="info">
                            <p className="name">{USER.name}</p>
                            <p
                                className="userid"
                                onClick={() => copyID(USER.id)}>
                                {USER.id}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default ProfileTopView;
