// set content of modal on / off


import { createSlice } from "@reduxjs/toolkit";


const modalSlice = createSlice({
  name: "modal",
  initialState: {
    content: "",
  },
  reducers: {
    setContent: (state,action) => {
        return {
          ...state,
          content: action.payload,
        };
    },
    clearContent: (state) => {
        return {
          ...state,
          content: "",
        };
    },
  }
});


export const { setContent, clearContent } = modalSlice.actions;


export default modalSlice.reducer;
