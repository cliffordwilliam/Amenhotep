// 1. grab createSlice
import { createSlice } from "@reduxjs/toolkit";


// 2. use it to make slice -> 3. make ur state & setter
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 10,
    form: 'update'
  },
  reducers: {
    increment: (state, action) => {
      console.log(action)
      state.count += 1
    },
    decrement: (state, action) => {
      console.log(action)
      state.count -= action.payload
    }
  }
})


// for components
// 3. export setter
export const { increment, decrement } = counterSlice.actions


// for index.js (STORE)
// 4. export reducer
export default counterSlice.reducer

// index.js will export STORE -> using setter from slices from here