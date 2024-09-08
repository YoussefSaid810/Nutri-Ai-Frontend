import { createSlice } from "@reduxjs/toolkit";

const current_theme = () => {
    let theme = localStorage.getItem("theme");
    return theme === "true";
};

const Theme = createSlice({
    name: "theme",
    initialState: current_theme(),
    reducers: {
        toggleTheme: (state) => {
            state = !state;
            localStorage.setItem("theme", "" + state);
            return state;
        },
    },
});

// Action creators are generated for each case reducer function
export const { toggleTheme } = Theme.actions;

export default Theme.reducer;
