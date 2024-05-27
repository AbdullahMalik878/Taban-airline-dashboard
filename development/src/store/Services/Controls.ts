import { createSlice } from "@reduxjs/toolkit";
import { AppControls } from "@/types/types";

const initialState: AppControls = {
  sidebarActiveState: true,
  fullScreenRef: false,
};

export const Controls = createSlice({
  name: "Controls",
  initialState: initialState,

  reducers: {
    setSidebarToggleStateAction: (state, actions) => {
      const { newValue } = actions.payload;
      state.sidebarActiveState = newValue;
    },
    setFullScreenStateAction: (state, actions) => {
      const { newValue } = actions.payload;
      state.fullScreenRef = newValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSidebarToggleStateAction, setFullScreenStateAction } =
  Controls.actions;

export default Controls.reducer;
