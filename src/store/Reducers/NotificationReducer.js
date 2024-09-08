import { createSlice } from "@reduxjs/toolkit";

const NotifyReducer = createSlice({
    name: "notify",
    initialState: [],
    reducers: {
        addNotification: (notifies, { payload }) => {
            const { message, type, duration } = payload;
            const newNTF = {
                id: "" + new Date(),
                message,
                type,
                duration: duration * 1000 || 7000,
            };
            notifies.push(newNTF);
        },
        removeNotification: (notifies, { payload }) => {
            let ntIDX = -1;
            notifies.forEach((nt, idx) => {
                if (nt.id === payload) ntIDX = idx;
            });
            if (ntIDX !== -1) notifies.splice(ntIDX, 1);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addNotification, removeNotification } = NotifyReducer.actions;

export default NotifyReducer.reducer;
