import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenMode: localStorage.getItem("screenMode")
    ? JSON.parse(localStorage.getItem("screenMode"))
    : "light",
};

const screenModeSlice = createSlice({
  name: "screenMode",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      (state.screenMode = "dark"),
        localStorage.setItem("screenMode", JSON.stringify("dark"));
    },
    setLightMode: (state) => {
      (state.screenMode = "light"),
        localStorage.setItem("screenMode", JSON.stringify("light"));
    },
  },
});

export const { setDarkMode, setLightMode } = screenModeSlice.actions;
export default screenModeSlice.reducer;
