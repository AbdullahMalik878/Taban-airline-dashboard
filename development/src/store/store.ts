import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./Services/Theme";
import Controls from "./Services/Controls";

export const store = configureStore({
  reducer: {
    themecontrols: ThemeSlice,
    appcontrols: Controls,
  },
  devTools: import.meta.env.VITE_APP_NODE_ENV === "development" ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
