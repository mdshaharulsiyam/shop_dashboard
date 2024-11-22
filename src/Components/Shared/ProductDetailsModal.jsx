import React from "react";
import { Modal, Descriptions } from "antd";

const ProductDetailsModal = ({ visible, onClose, product }) => {
    return (
        <Modal
            title="Product Details"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {product ? (
                <Descriptions bordered>
                    <Descriptions.Item label="Name">{product.name}</Descriptions.Item>
                    <Descriptions.Item label="Description">{product.description}</Descriptions.Item>
                    <Descriptions.Item label="Price">{product.price}</Descriptions.Item>
                    <Descriptions.Item label="Stock">{product.stock}</Descriptions.Item>
                    <Descriptions.Item label="Category">
                        {product.category?.name || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Subcategory">
                        {product.subCategory?.name || "N/A"}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <p>No product selected</p>
            )}
        </Modal>
    );
};

export default ProductDetailsModal;
