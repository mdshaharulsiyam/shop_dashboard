import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { useGetAllProductsQuery, useDeleteProductMutation } from "../../Redux/Apis/productApi";
import ProductForm from "../../Components/Shared/ProductForm";
import ProductDetailsModal from "../../Components/Shared/ProductDetailsModal";

const Products = () => {
    const { data: products, isLoading } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id).unwrap();
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedProduct(record);
                            setIsDetailsVisible(true);
                        }}
                        style={{ marginRight: 8 }}
                    >
                        View Details
                    </Button>
                    <Button
                        type="default"
                        onClick={() => {
                            setSelectedProduct(record);
                            setIsFormVisible(true);
                        }}
                        style={{ marginRight: 8 }}
                    >
                        Update
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this product?"
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

    return (
        <div>
            <h2>Products</h2>
            <Button
                type="primary"
                onClick={() => {
                    setSelectedProduct(null);
                    setIsFormVisible(true);
                }}
                style={{ marginBottom: 16 }}
            >
                Add Product
            </Button>

            <Table
                rowKey="_id"
                dataSource={products?.data}
                columns={columns}
                loading={isLoading}
                pagination={{ pageSize: 10 }}
            />

            {/* Product Form */}
            {isFormVisible && (
                <ProductForm
                    visible={isFormVisible}
                    onClose={() => setIsFormVisible(false)}
                    product={selectedProduct}
                />
            )}

            {/* Product Details Modal */}
            {isDetailsVisible && (
                <ProductDetailsModal
                    visible={isDetailsVisible}
                    onClose={() => setIsDetailsVisible(false)}
                    product={selectedProduct}
                />
            )}
        </div>
    );
};

export default Products;
