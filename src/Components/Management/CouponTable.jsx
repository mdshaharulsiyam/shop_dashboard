import React from "react";
import { Table, Popconfirm, Button } from "antd";
import { useGetCouponsQuery, useDeleteCouponMutation } from "../../Redux/Apis/couponApi";
import toast from "react-hot-toast";

const CouponTable = ({ onEdit }) => {
    const { data: coupons, isLoading } = useGetCouponsQuery();
    const [deleteCoupon] = useDeleteCouponMutation();

    const handleDelete = async (id) => {
        try {
            await deleteCoupon(id).unwrap();
            toast.success("Coupon deleted successfully");
        } catch (error) {
            toast.error("Failed to delete coupon");
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Discount (%)",
            dataIndex: "percentage",
            key: "percentage",
        },
        {
            title: "Total Available",
            dataIndex: "totalAvailable",
            key: "totalAvailable",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this coupon?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger">Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    return <Table rowKey="_id" dataSource={coupons?.data || []} columns={columns} loading={isLoading} />;
};

export default CouponTable;
