import { configureStore } from "@reduxjs/toolkit";
import userChatSlice from "../reducers/userChatSlice";

// create store with redux toolkit function configureStore
export const store = configureStore({
    reducer: {
        userChat: userChatSlice,
    },
});