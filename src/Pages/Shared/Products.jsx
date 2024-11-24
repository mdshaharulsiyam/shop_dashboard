import React, { useState } from "react";
import { Table, Button, Popconfirm, Select, Input } from "antd";
import { useGetAllProductsQuery, useDeleteProductMutation, useApproveProductMutation } from "../../Redux/Apis/productApi";
import ProductForm from "../../Components/Shared/ProductForm";
import ProductDetailsModal from "../../Components/Shared/ProductDetailsModal";
import { useGetProfileQuery } from "../../Redux/Apis/authApi";
import toast from "react-hot-toast";

const { Option } = Select;

const Products = () => {
    const { data, isLoading: fetching, isError, error, isFetching } = useGetProfileQuery();
    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");

    const filterParams = {
        search: searchText,
        isFeatured: filter === "featured" ? true : filter === "notFeatured" ? false : undefined,
        isApproved: filter === "approved" ? true : filter === "notApproved" ? false : undefined,
    };

    const { data: products, isLoading } = useGetAllProductsQuery(filterParams);
    const [deleteProduct] = useDeleteProductMutation();
    const [approveProduct] = useApproveProductMutation();

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

    const handleApprove = async (id) => {
        try {
            await approveProduct(id).unwrap();
            toast.success("Product approved successfully");
        } catch (error) {
            toast.error("Failed to approve product");
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
            title: "Featured",
            dataIndex: "isFeatured",
            key: "isFeatured",
            render: (isFeatured) => (isFeatured ? "Yes" : "No"),
        },
        {
            title: "Approved",
            dataIndex: "isApproved",
            key: "isApproved",
            render: (isApproved) => (isApproved ? "Yes" : "No"),
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
                    {(data?.data?.role === "ADMIN" || data?.data?.role === "SUPER_ADMIN") && !record.isApproved && (
                        <Popconfirm
                            title="Are you sure to approve this product?"
                            onConfirm={() => handleApprove(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" style={{ marginRight: 8 }}>
                                Approve
                            </Button>
                        </Popconfirm>
                    )}
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
            <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
                <Input
                    placeholder="Search products"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />
                <Select
                    value={filter}
                    onChange={(value) => setFilter(value)}
                    style={{ width: 200 }}
                >
                    <Option value="all">All</Option>
                    <Option value="featured">Featured</Option>
                    <Option value="notFeatured">Not Featured</Option>
                    <Option value="approved">Approved</Option>
                    <Option value="notApproved">Not Approved</Option>
                </Select>
                <Button
                    type="primary"
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsFormVisible(true);
                    }}
                >
                    Add Product
                </Button>
            </div>

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
