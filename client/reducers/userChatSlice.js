import {createSlice} from '@reduxjs/toolkit';

const options = {
    name: 'userChat',
    initialState: {
        user: "",
        roomChat: "",
    },
    reducers: {
        setUserChat: (state, action) => (state = action.payload),
    },
};

// create user slicde with options in the parameters
export const userChatSlice = createSlice(options);

// Action creators are generated for each case reducer function
export const { setUserChat } = userChatSlice.actions;

// selectors
export const getUserChatSelector = state => state;

export default userChatSlice.reducer;