import { createBrowserRouter, redirect,useNavigate  } from "react-router-dom";

import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home'
import Users from './pages/Users'
import UsersDetail from "./pages/UserDetail";
import MyDetail from "./pages/MyDetail";
import EditMyDetail from "./pages/EditMyDetail";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import Spotify from "./pages/Spotify";
import Drinks from "./pages/Drinks";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";


const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.token) {
          return redirect("/register")
      }
      return null
  },
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/drinks',
        element: <Drinks />
      },
      {
        path: '/posts',
        element: <Posts />
      },
      {
        path: '/postDetail/:id',
        element: <PostDetail />
      },
      {
        path: '/user/detail/:id',
        element: <UsersDetail />
      },
      {
        path: '/myDetail',
        element: <MyDetail />
      },
      {
        path: '/editMyDetail',
        element: <EditMyDetail />
      },
      {
        path: '/chatRooms',
        element: <ChatRooms />
      },
      {
        path: '/chatRoom/:id',
        element: <ChatRoom />
      },
      {
        path: '/spotify',
        element: <Spotify />
      },
    ]
  },
  {
    element:<PublicLayout/>,
    children:[
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
])

export default router