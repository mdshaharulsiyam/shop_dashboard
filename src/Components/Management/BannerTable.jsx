import React from "react";
import { Table, Popconfirm, Switch } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetBannerQuery, useDeleteBannerMutation, useUpdateBannerStatusMutation } from "../../Redux/Apis/bannerApi"; // Replace with the correct path
import toast from "react-hot-toast";

const BannerTable = ({ onEdit }) => {
    const { data: Banner, isLoading } = useGetBannerQuery();
    const [deleteBanner] = useDeleteBannerMutation();
    const [updateBannerStatus] = useUpdateBannerStatusMutation();

    const handleDelete = async (id) => {
        try {
            await deleteBanner(id).unwrap();
            toast.success("Banner deleted successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to delete banner");
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await updateBannerStatus(id).unwrap();
            toast.success("Banner status updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update banner status");
        }
    };

    const columns = [
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (img) => (
                <img
                    src={img}
                    alt="Banner"
                    style={{ width: "100px", height: "50px", objectFit: "cover" }}
                />
            ),
        },
        {
            title: "Link",
            dataIndex: "link",
            key: "link",
            render: (link) => (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                </a>
            ),
        },
        {
            title: "Active",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive, record) => (
                <Switch
                    checked={isActive}
                    onChange={() => handleToggleStatus(record._id)}
                />
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <button style={{
                        padding:'6px'
                    }} className="button-black" onClick={() => onEdit(record)}>
                        <MdEdit size={18} />
                    </button>
                    <Popconfirm
                        title="Are you sure you want to delete this banner?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button style={{
                            padding:'6px'
                        }} className="button-red">
                            <MdDelete size={18} />
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            dataSource={Banner?.data}
            columns={columns}
            loading={isLoading}
        />
    );
};

export default BannerTable;
