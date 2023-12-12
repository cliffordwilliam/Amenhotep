// 1. grab createSlice
import { createSlice } from "@reduxjs/toolkit";


// 2. use it to make slice -> 3. make ur state & setter
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    data: [],
    loading: false,
    error: ""
  },
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
      state.error = ""
    },
    fetchSuccess: (state, action) => { // 'action' to receive data (from outside user)
      state.loading = false
      state.data = action.payload
    },
    fetchError: (state, action) => {
      state.loading = false
      state.error = ""
    }
  }
})


// for components
// 3. export setter
const { fetchStart, fetchSuccess, fetchError } = menuSlice.actions

// api call
export function fetchMenus() {
  return async function (dispatch) {
    dispatch(fetchStart()) // call setter
    try {
      const res = await fetch(`http://localhost:3000/items`)
      if (!res.ok) throw new Error("Something wrong!");
      const data = await res.json()

      dispatch(fetchSuccess(data)) // call setter
    } catch (error) {
      dispatch(fetchError(error)) // call setter
    }
  }

}


// for index.js (STORE)
// 4. export reducer
export default menuSlice.reducer


// index.js will export STORE -> using setter from slices from here