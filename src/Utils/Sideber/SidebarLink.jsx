import { FaUserDoctor } from "react-icons/fa6";
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
        path: '/appointment',
        label: 'Appointment',
        icon: <LuCalendarClock size={24} />,
    },
    {
        path: '/transactions',
        label: 'Transactions',
        icon: <HiArrowTrendingUp size={24} />,
    },
    {
        path: '/patients',
        label: 'Patients',
        icon: <LuUser2 size={24} />,
    },
    {
        path: '/doctors',
        label: 'Doctors',
        icon: <FaUserDoctor size={24} />,
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