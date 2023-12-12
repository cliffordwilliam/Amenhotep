import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import menuSlice from './menuSlice'


// 1. export STORE -> using setter from slices
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    menu: menuSlice
  },
})