import { createSlice } from "@reduxjs/toolkit";

const FoodModel = {
    data: [],
    max_loaded_indices: [],
    total: 0,
};

export const Foods = createSlice({
    name: "foods",
    initialState: FoodModel,
    reducers: {
        setFoods: (foods, { payload }) => {
            return {
                data: payload.data
                    ? [...foods.data, ...payload.data]
                    : [...foods.data, ...payload],
                total: payload.total || foods.total,
                max_loaded_indices: payload.max_loaded_indices
                    ? [
                          ...foods.max_loaded_indices,
                          ...payload.max_loaded_indices,
                      ]
                    : foods.max_loaded_indices,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setFoods } = Foods.actions;

export default Foods.reducer;
