import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface apiState {
  data: any;
}

const initialState: apiState = {
  data: "",
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    getDataHandler(state, action: PayloadAction<string>) {
      state.data = action.payload;
    },

    loadingHandler(state, action: PayloadAction<any>) {},
  },
});

export const apiActions = apiSlice.actions;
export default apiSlice.reducer;
