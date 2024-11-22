import React, { useState } from "react";
import { Table, Input, Select, Popconfirm, Modal, Button, Descriptions, Badge } from "antd";
import { MdDelete, MdBlock, MdCheckCircle, MdInfo } from "react-icons/md";
import { useGetAllShopsQuery, useDeleteShopMutation, useUpdateShopMutation } from "../../Redux/Apis/shopApi";
import toast from "react-hot-toast";

const { Search } = Input;
const { Option } = Select;

const Vendors = () => {
    const { data: shops, isLoading } = useGetAllShopsQuery();
    const [deleteShop] = useDeleteShopMutation();
    const [updateShop] = useUpdateShopMutation();
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    const handleDelete = async (id) => {
        deleteShop(id).unwrap()
            .then((res) => {
                toast.success(res?.message || "Vendor deleted successfully");
            })
            .catch((err) => {
                toast.error(err?.data?.message || "Something went wrong");
            });
    };

    const handleBlockUnblock = async (id, blockStatus) => {
        updateShop({ id, updatedShopData: { block: !blockStatus } }).unwrap()
            .then(() => {
                toast.success(blockStatus ? "Vendor unblocked" : "Vendor blocked");
            })
            .catch((err) => {
                toast.error(err?.data?.message || "Something went wrong");
            });
    };

    const handleApprove = async (id) => {
        updateShop({ id, updatedShopData: { isApprove: true } }).unwrap()
            .then(() => {
                toast.success("Vendor approved successfully");
            })
            .catch((err) => {
                toast.error(err?.data?.message || "Something went wrong");
            });
    };

    const showDetailsModal = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedVendor(null);
    };

    const filteredData = shops?.data
        ?.filter((shop) => {
            if (filterStatus === "approved") return shop.isApprove;
            if (filterStatus === "not-approved") return !shop.isApprove;
            if (filterStatus === "blocked") return shop.block;
            if (filterStatus === "not-blocked") return !shop.block;
            return true;
        })
        ?.filter((shop) => shop.name.toLowerCase().includes(searchText.toLowerCase()));

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (text) => (
                <img
                    src={text}
                    alt="Logo"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "user",
            key: "email",
            render: (_, record) => <p>{record.user.email}</p>,
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Total Products",
            dataIndex: "totalProducts",
            key: "totalProducts",
        },
        {
            title: "Status",
            dataIndex: "isApprove",
            key: "isApprove",
            render: (_, record) =>
                record.isApprove ? (
                    <span style={{ color: "green" }}>Approved</span>
                ) : (
                    <Popconfirm
                        title="Approve this vendor?"
                        onConfirm={() => handleApprove(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span style={{ color: "red", cursor: "pointer" }}>
                            Not Approved
                        </span>
                    </Popconfirm>
                ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2 items-center">
                    <button onClick={() => showDetailsModal(record)}>
                        <MdInfo size={22} />
                    </button>
                    <Popconfirm
                        title={record.block ? "Unblock this vendor?" : "Block this vendor?"}
                        onConfirm={() => handleBlockUnblock(record._id, record.block)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <MdBlock
                            size={22}
                            style={{
                                cursor: "pointer",
                                color: record.block ? "gray" : "red",
                            }}
                        />
                    </Popconfirm>
                    <Popconfirm
                        title="Are you sure you want to delete this vendor?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <MdDelete size={22} style={{ cursor: "pointer", color: "darkred" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Search
                    placeholder="Search by name"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    defaultValue="all"
                    onChange={(value) => setFilterStatus(value)}
                    style={{ width: 200 }}
                >
                    <Option value="all">All</Option>
                    <Option value="approved">Approved</Option>
                    <Option value="not-approved">Not Approved</Option>
                    <Option value="blocked">Blocked</Option>
                    <Option value="not-blocked">Not Blocked</Option>
                </Select>
            </div>
            <Table
                rowKey="_id"
                dataSource={filteredData}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />
            {selectedVendor && (
                <Modal
                    title={<h3 style={{ margin: 0 }}>Vendor Details</h3>}
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={[
                        <Button key="close" onClick={handleModalClose}>
                            Close
                        </Button>,
                    ]}
                    centered
                >
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Name">{selectedVendor.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{selectedVendor.user.email}</Descriptions.Item>
                        <Descriptions.Item label="Address">{selectedVendor.address}</Descriptions.Item>
                        <Descriptions.Item label="Total Products">{selectedVendor.totalProducts}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            {selectedVendor.isApprove ? (
                                <Badge status="success" text="Approved" />
                            ) : (
                                <Badge status="error" text="Not Approved" />
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Blocked">
                            {selectedVendor.block ? (
                                <Badge status="error" text="Yes" />
                            ) : (
                                <Badge status="success" text="No" />
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </Modal>
            )}
        </div>
    );
};

export default Vendors;
