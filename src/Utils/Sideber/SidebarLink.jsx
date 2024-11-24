import { CiShop } from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { FaBasketShopping, FaUser, FaUserDoctor, FaUsers } from "react-icons/fa6";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { LuCalendarClock, LuUser2 } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

export const SidebarLink = [
    {
        path: '/',
        label: 'Dashboard',
        icon: <LuCalendarClock size={24} />,
    },
    {
        path: '/vendors',
        label: 'Vendors',
        icon: <CiShop size={24} />,
    },
    {
        path: '/users',
        label: 'User',
        icon: <FaUsers size={24} />,
    },
    {
        path: '/products',
        label: 'Product',
        icon: <FaBasketShopping size={24} />,
    },
    {
        path: '/management',
        label: 'Management',
        icon: <MdDashboard size={24} />,
    },
]


export const SettingLinks = [
    {
        path: '/profile',
        label: 'Profile',
    },
    {
        path: '/faq',
        label: 'FAQ',
    },
    {
        path: '/privacy-policy',
        label: 'Privacy Policy',
    },
    {
        path: '/terms-&-condition',
        label: 'Terms & Condition',
    },
]

export const VendorSidebarLink = [
    {
        path: '/vendor/dashboard',
        label: 'Dashboard',
        icon: <LuCalendarClock size={24} />,
    },
    {
        path: '/vendor/products',
        label: 'Products',
        icon: <FaBasketShopping size={24} />,
    },
    {
        path: '/vendor/orders',
        label: 'Orders',
        icon: <FaShippingFast size={24} />,
    },
    {
        path: '/vendor/shop-profile',
        label: 'Profile',
        icon: <FaUser size={24} />,
    },
]