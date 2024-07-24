// import  { useMemo } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";


import HomePage from "./pages/homePage/home";
import ProfilePage from "./pages/profilePage/profile";
import LoginPage from "./pages/loginPage/login";
import Register from "./pages/signup/signup";

import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftbar/LeftBar";
import RightBar from "./components/rightbar/RightBar";
import './style.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.jsx";
import { AuthContext } from "./context/authContext.jsx";

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'
const App = () => {

  const {currentUser} = useContext(AuthContext);
  const {darkMode} = useContext(DarkModeContext)
  console.log(darkMode)
  console.log(currentUser)

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
      <div className={darkMode ? "theme-dark" : "theme-light"}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{flex: 6}}>
          <Outlet />
          </div>
          <RightBar />
        </div>
      </div>

     </QueryClientProvider>
      
    );
  };

  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute>
         <Layout />
      </ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/profile/:id",
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
   

    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
