import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
import modalSlice from './modalSlice'


// Redux Thunk middleware - handle async

// 1. export STORE -> using setter from slices
export const store = configureStore({
  reducer: {
    api:apiSlice,
    modal:modalSlice,
  },
})