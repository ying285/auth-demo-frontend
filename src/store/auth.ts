import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
  isAuth: boolean;
  isLoading: boolean;
  token: any;
  error: any;
}

const initialState: authState = {
  isAuth: false,
  isLoading: false,
  token: "",
  error: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getErrorMessage(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = localStorage.removeItem("token");
    },
    isAuthHandler(state) {
      if (localStorage.getItem("token")) {
        state.isAuth = true;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
