import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import Otp from "../Pages/Auth/Otp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Management from "../Pages/Dashboard/Management";
import Profile from "../Pages/Dashboard/Profile";
import Notification from "../Pages/Dashboard/Notification";
import FAQ from "../Pages/Dashboard/FAQ";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import TermsCondition from "../Pages/Dashboard/TermsCondition";
import AdminRoutes from "../PrivetRoutes/AdminRoutes";

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/',
                element: <DashboardHome />
            },
            {
                path: '/management',
                element: <Management />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/notification',
                element: <Notification />
            },
            {
                path: '/faq',
                element: <FAQ />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/terms-&-condition',
                element: <TermsCondition />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />
    },
    {
        path: '/otp',
        element: <Otp />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    },
])