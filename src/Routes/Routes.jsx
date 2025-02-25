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
import Vendors from "../Pages/Dashboard/Vendors";
import Users from "../Pages/Dashboard/Users";
import VendorRoutes from "../PrivetRoutes/VendorRoutes";
import VendorHome from "../Components/VendorDashboard/VendorHome";
import Products from "../Pages/Shared/Products";
import Orders from "../Pages/Shared/Orders";
export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <AdminRoutes><Dashboard /></AdminRoutes>,
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
                path: '/vendors',
                element: <Vendors />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/orders',
                element: <Orders />
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
        path: '/vendor',
        element: <VendorRoutes> <Dashboard /></VendorRoutes>,
        children: [
            {
                path: '/vendor/dashboard',
                element: <VendorHome />
            },
            {
                path: '/vendor/products',
                element: <Products />
            },
            {
                path: '/vendor/orders',
                element: <Orders />
            },
            {
                path: '/vendor/shop-profile',
                element: <Profile />
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