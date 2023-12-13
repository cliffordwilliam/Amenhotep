import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "./pages/Layout";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.access_token) {
          return redirect("/register")
      }
      return null
  },
    children: [
      {
        path: '/',
      },
    ]
  },
  {
    path: '/register',
    element: <Register />
  }
])

export default router