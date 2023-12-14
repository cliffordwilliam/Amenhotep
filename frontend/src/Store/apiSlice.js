import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { setContent, clearContent } from '../Store/modalSlice';

const apiSlice = createSlice({
  name: "api",
  initialState: {
  },
  reducers: {
    onRequestStart: (state, action) => {
      console.log('request start');
    },
    onRequestOk: (state, action) => {
      console.log('request OK:', action.payload);
    },
    onRequestBad: (state, action) => {
      console.log('request BAD:', action.payload);
    },
  }
});

export const { onRequestStart, onRequestOk, onRequestBad } = apiSlice.actions;

export function APIrequest({ method, apiEndpoint, options, updateContentOnSuccess = false, callbackArray=[] }) {

  return async function (dispatch) {
    try {
      dispatch(onRequestStart());

      const response = await axios({
        method,
        url: apiEndpoint,
        ...options,
        data: options.data,
      });

      // Dispatch another action here
      if (updateContentOnSuccess) {
        dispatch(setContent(response.data.msg));
      }

      dispatch(onRequestOk(response?.data));

      // Call each callback function in the array
      callbackArray.forEach((callback) => {
        callback(response?.data, null);
      });
    } catch (error) {
      dispatch(onRequestBad(error.response?.data.error.msg));
      dispatch(setContent(error.response?.data.error.msg));

      // Call each callback function in the array with an error parameter
      callbackArray.forEach((callback) => {
        callback(null, error);
      });
    }
  };
}

export default apiSlice.reducer;
