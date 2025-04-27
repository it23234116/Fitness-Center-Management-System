import { createTheme, ThemeProvider } from "@mui/material";
import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import palette from "./theme/palette";
import Loading from "./components/Loading/Loading";
import typography from "./theme/typography";
import "./App.css";
import Navbar from "./components/Navbar/navbar";
import Layout1 from "./Layout/layout1";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Layout2 from "./Layout/layout2";
import HomeLayout from "./Layout/homeLayout";

const Login = React.lazy(() => import("./pages/Login/login"));
const Register = React.lazy(() => import("./pages/Register/register"));
const Item01 = React.lazy(() => import("./pages/Item01/item01"));
const Userinfo = React.lazy(() => import("./pages/Admin/Userinfo/userinfo"));
const Profile = React.lazy(() => import("./pages/Profile/profile"));
const Test = React.lazy(() => import("./pages/Test/test"));
const Home = React.lazy(() => import("./pages/Home/home"));
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/Reset_Password/ResetPassword")
);

const theme = createTheme({
  palette: palette.light,
  typography,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <ResetPassword />,
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["member"] || ["admin"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Layout2 />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/userinfo",
        element: <Userinfo />,
      },
      // {
      //   path:"path",
      //   element:<Units01 />,
      // }
    ],
  },

  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["member"]}>
        <Layout1 />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/session",
        element: <Item01 />,
      },
      {
        path: "/store",
        element: <Test />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["member"]}>
        <HomeLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
