import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Load user data from localStorage if it exists
const savedUser = localStorage.getItem("emediiUser");
const initialState = savedUser ? { value: JSON.parse(savedUser) } : {};

const userReducer = createSlice({
    name: "person",
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("emediiUser", JSON.stringify(action.payload));
            Cookies.set("emediiUser", JSON.stringify(action.payload));
        },
        loadUser: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("emediiUser");
            Cookies.remove("emediiUser");
            state.value = {};
        },
    },
});

// Exporting actions and reducer
export const { updateName, loadUser, logout } = userReducer.actions;
export default userReducer.reducer;
