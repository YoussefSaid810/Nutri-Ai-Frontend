import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const User = createSlice({
    name: "user",
    initialState: JSON.parse(localStorage.getItem("user")) || null, //Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    reducers: {
        setUser: (user, { payload }) => {
            // 1- If there is no user
            if (!user) {
                localStorage.setItem("user", JSON.stringify(payload));
                return payload;
            }

            const newUserUpdates = { ...user, ...payload };
            localStorage.setItem("user", JSON.stringify(newUserUpdates));

            // 2- If user exists
            return newUserUpdates;
        },
        logoutUser: (_, action) => {
            Cookies.remove("TOKEN");
            localStorage.removeItem("user");

            return null;
        },
        updateInformation: (user, { payload }) => {
            user.information = { ...user.information, ...payload };
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUser, updateInformation, logoutUser } = User.actions;

export default User.reducer;
