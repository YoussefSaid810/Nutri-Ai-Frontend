import { createSlice } from "@reduxjs/toolkit";

export const board = [
    {
        id: 1,
        name: "yakoub qamar-eldin debiaza",
        points: 250,
    },
    {
        id: 2,
        name: "khaled kashmery",
        points: 200,
    },
    {
        id: 3,
        name: "khider kraweta",
        points: 190,
    },
    {
        id: 5,
        name: "ismael ahmed kanabawy",
        points: 185,
    },
    {
        id: 6,
        name: "othman abd-elgalel shesha",
        points: 100,
    },
];

const Leaderboard = createSlice({
    name: "leaderboard",
    initialState: board,
    reducers: {
        setBoard: (_, actions) => {
            return actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeLang } = Leaderboard.actions;

export default Leaderboard.reducer;
