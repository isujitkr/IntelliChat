import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import conversationSlice from "./conversationSlice";
import messageSlice from "./messageSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    conversation: conversationSlice.reducer,
    message: messageSlice.reducer,
  },
});
