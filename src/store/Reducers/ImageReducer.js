import { createSlice } from "@reduxjs/toolkit";

const ImageReducer = createSlice({
    name: "previewer",
    initialState: null,
    reducers: {
        previewImage: (_, { payload }) => {
            return payload;
        },
        closePreviewer: (_, __) => {
            return null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { previewImage, closePreviewer } = ImageReducer.actions;

export default ImageReducer.reducer;
