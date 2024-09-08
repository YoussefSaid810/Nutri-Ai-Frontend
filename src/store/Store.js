import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./Reducers/ThemeReducer";
import LangReducer from "./Reducers/LangReducer";
import Leaderboard from "./Reducers/boardReducer";
import Foods from "./Reducers/FoodsReducer";
import Languages_trans from "./Reducers/Languages";
import { thunk } from "redux-thunk";
import LoadingReducer from "./Reducers/LoadingReducer";
import UserReducer from "./Reducers/userReducer";
import NotifyReducer from "./Reducers/NotificationReducer";
import ImageReducer from "./Reducers/ImageReducer";

export const store = configureStore(
    {
        reducer: {
            theme: ThemeReducer,
            lang: LangReducer,
            translate: Languages_trans,
            board: Leaderboard,
            foods: Foods,
            user: UserReducer,
            loading: LoadingReducer,
            notification: NotifyReducer,
            imagePreviewer: ImageReducer,
        },
        devTools: process.env.REACT_APP_ENV === "dev",
    },
    applyMiddleware(thunk)
);

export const AppDispatch = typeof store.dispatch;

export default store;
