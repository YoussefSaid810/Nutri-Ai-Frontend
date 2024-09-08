import { createSlice } from "@reduxjs/toolkit";

export const Supported_Langs = [
    {
        id: 1,
        code: "en",
        name: "english",
        dir: "ltr",
        idx: 0,
    },
    {
        id: 2,
        code: "ar",
        name: "arabic",
        dir: "rtl",
        idx: 1,
    },
];

const current_lang = () => {
    let lang = JSON.parse(localStorage.getItem("lang"));
    return lang ? lang : Supported_Langs[0];
};

const Language = createSlice({
    name: "lang",
    initialState: current_lang(),
    reducers: {
        changeLang: (_, actions) => {
            const lang = actions.payload;
            localStorage.setItem("lang", JSON.stringify(lang));
            return lang;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeLang } = Language.actions;

export default Language.reducer;
