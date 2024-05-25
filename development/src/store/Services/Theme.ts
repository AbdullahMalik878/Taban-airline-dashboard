import { createSlice } from "@reduxjs/toolkit";

export const Theme = createSlice({
  name: "Theme",
  initialState: {
    ThemeState: "light",
    theme: localStorage.getItem("hq-theme") || "system",
  },

  reducers: {
    setThemeStateAction: (state, actions) => {
      const { newValue } = actions.payload;
      localStorage.setItem("hq-theme", newValue);
      state.theme = newValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setThemeStateAction } = Theme.actions;

export default Theme.reducer;