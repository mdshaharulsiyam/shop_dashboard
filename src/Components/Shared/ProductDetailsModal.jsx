import { Button, Descriptions, Modal, Space, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;

const ProductDetailsModal = ({ visible, onClose, product }) => {
  return (
    <Modal
      title={
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Title level={4} style={{ margin: 0 }}>
            Product Details
          </Title>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={
        <div style={{ textAlign: "center" }}>
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      {product ? (
        <>
          <Descriptions
            bordered
            size="middle"
            column={{ xs: 1, sm: 2, md: 2 }}
            layout="vertical"
          >
            <Descriptions.Item label="Name">
              <Text strong>{product.name}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <Text type="success">${product.price}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              <Text type={product.stock > 10 ? "success" : "danger"}>
                {product.stock}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {product.category?.name || <Text type="secondary">N/A</Text>}
            </Descriptions.Item>
            <Descriptions.Item label="Subcategory">
              {product.subCategory?.name || <Text type="secondary">N/A</Text>}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions.Item label="Description">
            <p className='font-bold'>description</p>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Descriptions.Item>
        </>
      ) : (
        <Space style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <Text type="secondary">No product selected</Text>
        </Space>
      )}
    </Modal>
  );
};

export default ProductDetailsModal;
