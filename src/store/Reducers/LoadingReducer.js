import { createSlice } from "@reduxjs/toolkit";

const LoadingReducer = createSlice({
    name: "loading",
    initialState: false,
    reducers: {
        loadingState: (_, { payload }) => {
            return payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { loadingState } = LoadingReducer.actions;

export default LoadingReducer.reducer;
