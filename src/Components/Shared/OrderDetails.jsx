import moment from 'moment';
import React from 'react';
import { useOrdersDetailsQuery } from '../../Redux/Apis/orderApi';
import { Spin, Alert } from 'antd';

const OrderDetails = ({ selectedOrder }) => {
    // Fetch order details using the provided `selectedOrder._id`
    const { data, isLoading, isError, error } = useOrdersDetailsQuery(selectedOrder?._id, {
        skip: !selectedOrder, // Skip query if `selectedOrder` is null
    });

    if (isLoading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;
    }

    if (isError) {
        return <Alert message="Error" description={error?.data?.message || 'Failed to load order details'} type="error" showIcon />;
    }

    const orderDetails = data?.data;
console.log(orderDetails)
    if (!orderDetails) {
        return <p>No order details available.</p>;
    }

    return (
        <div>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {orderDetails?._id}</p>
            <p><strong>User:</strong> {orderDetails?.user?.name || 'N/A'} ({orderDetails?.user?.email || 'N/A'})</p>
            <p><strong>Total Amount:</strong> ${orderDetails?.totalAmount?.toFixed(2)}</p>
            <p><strong>Final Amount:</strong> ${orderDetails?.finalAmount?.toFixed(2)}</p>
            <p><strong>Payment Status:</strong> {orderDetails?.paymentStatus?.toUpperCase()}</p>
            <p><strong>Delivery Status:</strong> {orderDetails?.deliveryStatus?.toUpperCase()}</p>
            <p><strong>Payment Method:</strong> {orderDetails?.paymentMethod?.replace('_', ' ')?.toUpperCase()}</p>
            <p><strong>Order Date:</strong> {moment(orderDetails?.orderDate).format('LL')}</p>
            <p><strong>Estimated Delivery Date:</strong> {orderDetails?.estimatedDeliveryDate ? moment(orderDetails.estimatedDeliveryDate).format('LL') : 'N/A'}</p>
            <p><strong>Delivered At:</strong> {orderDetails?.deliveredAt ? moment(orderDetails.deliveredAt).format('LL') : 'N/A'}</p>
            <p><strong>Delivery Address:</strong></p>
            <ul>
                <li><strong>Street:</strong> {orderDetails?.deliveryAddress?.street || 'N/A'}</li>
                <li><strong>City:</strong> {orderDetails?.deliveryAddress?.city || 'N/A'}</li>
                <li><strong>State:</strong> {orderDetails?.deliveryAddress?.state || 'N/A'}</li>
                <li><strong>Zip Code:</strong> {orderDetails?.deliveryAddress?.zipCode || 'N/A'}</li>
            </ul>
            <h4>Items:</h4>
            <ul>
                {orderDetails?.items?.map((item) => (
                    <li key={item?.product?._id}>
                        <strong>{item?.product?.name}</strong> - {item?.quantity} pcs
                        {item?.size && ` (Size: ${item.size})`}
                        {item?.color && ` (Color: ${item.color})`}
                        <br />
                        Price: ${item?.product?.price?.toFixed(2)}
                    </li>
                ))}
            </ul>
            {orderDetails?.notes && <p><strong>Notes:</strong> {orderDetails?.notes}</p>}
            {orderDetails?.assignedRider && (
                <p><strong>Assigned Rider:</strong> {orderDetails?.assignedRider?.name || 'N/A'} ({orderDetails?.assignedRider?.email || 'N/A'})</p>
            )}
        </div>
    );
};

export default OrderDetails;
