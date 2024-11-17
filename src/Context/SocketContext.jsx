import React from 'react'
import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useGetProfileQuery } from '../Redux/Apis/authApi';
import { useGetNotificationsQuery } from '../Redux/Apis/notificationsApis';

const SocketContextData = createContext();

export const useSocketContext = () => {
    return useContext(SocketContextData);
};

const SocketContext = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { data, } = useGetProfileQuery()
    const [notifications, setNotifications] = useState([])
    const [notificationLimit, setNotificationLimit] = useState(50)
    const { data: notificationsData, isLoading: isLoadingNotifications } = useGetNotificationsQuery({ page: 1, limit: notificationLimit })
    useEffect(() => {
        if (data?.data) {
            if (notificationsData?.data?.length > 0) {
                setNotifications(notificationsData?.data)
            }
            const socket = io(`http://13.43.16.29:5000?userId=${data?.data?._id}`);
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });
            socket.on("new-notification", (notification) => {
                console.log('notification', notification);
                setNotifications(prev => [notification, ...prev])
            });
            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [data, notificationsData]);
    const socketData = {
        socket,
        onlineUsers,
        isLoadingNotifications,
        notifications,
        totalNotifications: notificationsData?.pagination?.totalItems,
        setNotificationLimit,
        notificationLimit
    }
    return <SocketContextData.Provider value={socketData}>{children}</SocketContextData.Provider>;
}

export default SocketContext
