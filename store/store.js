import { configureStore } from "@reduxjs/toolkit";
import userStore from "./userStore";

export const rootStore = configureStore({
  reducer: {
    user: userStore,
  },
});
