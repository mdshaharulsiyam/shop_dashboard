import React, { useState } from 'react';
import { Table, Button, Popconfirm, Modal, Tag, Select } from 'antd';
import { useGetAllOrdersQuery, useDeleteOrderMutation, useUpdateDeliveryStatusMutation } from '../../Redux/Apis/orderApi';
import moment from 'moment';
import { useGetProfileQuery } from '../../Redux/Apis/authApi';
import toast from 'react-hot-toast';
import OrderDetails from '../../Components/Shared/OrderDetails';

const { Option } = Select;

const Orders = () => {
    const { data: orders, isLoading } = useGetAllOrdersQuery();
    const { data, isLoading: fetching, isError, error, isFetching } = useGetProfileQuery();
    const [deleteOrder] = useDeleteOrderMutation();
    const [updateDeliveryStatus] = useUpdateDeliveryStatusMutation();

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDelete = async (id) => {
        try {
            await deleteOrder(id).unwrap();
            toast.success('Order deleted successfully');
        } catch (error) {
            toast.error('Failed to delete order');
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            await updateDeliveryStatus({ id, status }).unwrap();
            toast.success('Delivery status updated successfully');
        } catch (error) {
            toast.error('Failed to update delivery status');
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'User',
            dataIndex: ['user', 'name'],
            key: 'user',
            render: (_, record) => record?.user?.name || 'N/A',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status) => (
                <Tag color={status === 'paid' ? 'green' : 'orange'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Delivery Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status, record) => (
                <Select
                    value={status}
                    onChange={(value) => handleUpdateStatus(record._id, value)}
                    style={{ width: 150 }}
                >
                    {[
                        'pending',
                        'processing',
                        'shipped',
                        'out_for_delivery',
                        'delivered',
                        'canceled',
                        'returned',
                    ].map((statusOption) => (
                        <Option key={statusOption} value={statusOption}>
                            {statusOption.toUpperCase()}
                        </Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedOrder(record);
                            setIsModalVisible(true);
                        }}
                        style={{ marginRight: 8 }}
                    >
                        View Details
                    </Button>
                    {
                        (data?.data?.role === "ADMIN" || data?.data?.role === "SUPER_ADMIN") && <Popconfirm
                            title="Are you sure to delete this order?"
                            onConfirm={() => handleDelete(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                    }

                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                rowKey="_id"
                dataSource={orders?.data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />

            {/* Order Details Modal */}
            <Modal
                title="Order Details"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Close
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <OrderDetails selectedOrder={selectedOrder} />
                )}
            </Modal>
        </div>
    );
};

export default Orders;
