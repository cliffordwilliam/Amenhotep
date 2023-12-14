// remember user data

import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
      userId: 1,
      username: 'update',
      email: "",
      profile_picture: "",
      bio: "",
      credit: 0,
      created_at: "",
      updated_at: "",
    },
    reducers: {
      setId: (state, action) => {
        console.log(action.payload, 'id');
        return {
          ...state,
          userId: action.payload,
        };
      },
      setUsername: (state, action) => {
        console.log(action.payload, 'username');
        return {
          ...state,
          username: action.payload,
        };
      },
      setEmail: (state, action) => {
        console.log(action.payload, 'email');
        return {
          ...state,
          email: action.payload,
        };
      },
      setProfilePicture: (state, action) => {
        console.log(action.payload, 'profile picture');
        return {
          ...state,
          profile_picture: action.payload,
        };
      },
      setBio: (state, action) => {
        console.log(action.payload, 'bio');
        return {
          ...state,
          bio: action.payload,
        };
      },
      setCredit: (state, action) => {
        console.log(action.payload, 'credit');
        return {
          ...state,
          credit: action.payload,
        };
      },
    },
  });
  


export const { setUsername, setEmail,setProfilePicture,setBio,setCredit,setId } = userSlice.actions


export default userSlice.reducer