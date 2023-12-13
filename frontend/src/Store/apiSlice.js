// 1. grab createSlice
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 2. use it to make slice -> 3. make ur state & setter
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: ""
  },
  reducers: {
    onRequestStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    onRequestOk: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(action.payload);
    },
    onRequestBad: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action.payload);
    }
  }
});

// for components
// 3. export setter
export const { onRequestStart, onRequestOk, onRequestBad } = apiSlice.actions;

// async action creator for making API calls with Axios
export function fetchApi ({ method, apiEndpoint, options }) {
    return async function(dispatch){
        try {
            dispatch(onRequestStart());

            const response = await axios({
            method,
            url: apiEndpoint,
            ...options,
            });

            dispatch(onRequestOk(response.data));
        } catch (error) {
            dispatch(onRequestBad(error));
        }
    }
};

// for index.js (STORE)
// 4. export reducer
export default apiSlice.reducer;


// demo - how to shoot anything with this

/**
 * const options = {
  headers: {
    Authorization: "Bearer your-token",
    // Add any other headers as needed
  },
  data: {
    // Request body for methods like POST, PUT, or PATCH
    key: "value",
  },
  // Add any other Axios options as needed
};

dispatch(fetchApi({ method: "GET", apiEndpoint: "your-get-api-endpoint" }));
dispatch(fetchApi({ method: "POST", apiEndpoint: "your-post-api-endpoint", options }));
dispatch(fetchApi({ method: "PUT", apiEndpoint: "your-put-api-endpoint", options }));
dispatch(fetchApi({ method: "PATCH", apiEndpoint: "your-patch-api-endpoint", options }));
dispatch(fetchApi({ method: "DELETE", apiEndpoint: "your-delete-api-endpoint" }));

 * 
 */