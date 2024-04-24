import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: localStorage.getItem("user") || "",
};

const userSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("user");
    },
  },
});
export const { setUserName, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
