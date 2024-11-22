import React, { useState } from "react";
import { useGetAllUsersQuery, useBlockUserMutation } from "../../Redux/Apis/userApi";
import { Table, Popconfirm, Button, Input } from "antd";
import toast from "react-hot-toast";

const { Search } = Input;

const UserManagement = () => {
    const [searchText, setSearchText] = useState("");
    const { data: users, isLoading } = useGetAllUsersQuery(searchText);
    const [blockUser] = useBlockUserMutation();

    const handleBlockUnblock = async (id) => {
        try {
            await blockUser(id).unwrap();
            toast.success("User block status updated successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Filter users based on the search text


    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <Popconfirm
                    title={`Are you sure you want to ${record.block ? "unblock" : "block"} this user?`}
                    onConfirm={() => handleBlockUnblock(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button>{record.block ? "Unblock" : "Block"}</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            {/* Search Input */}
            <div style={{ marginBottom: "20px" }}>
                <Search
                    placeholder="Search by name or email"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            {/* User Table */}
            <Table
                rowKey="_id"
                dataSource={users?.data}
                columns={columns}
                loading={isLoading}
            />
        </div>
    );
};

export default UserManagement;
