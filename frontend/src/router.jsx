import { createBrowserRouter, redirect } from "react-router-dom";

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
import VelvetRoom from "./pages/VelvetRoom";

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
        path: '/chatRoom/1',
        element: <VelvetRoom />
      },
      {
        path: '/chatRooms/2',
        // element: <ChatRooms />
      },
      {
        path: '/chatRooms/3',
        // element: <ChatRooms />
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