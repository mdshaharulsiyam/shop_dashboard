import { Button, Input, Popconfirm, Select, Table } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ProductDetailsModal from "../../Components/Shared/ProductDetailsModal";
import ProductForm from "../../Components/Shared/ProductForm";
import { useGetProfileQuery } from "../../Redux/Apis/authApi";
import { useApproveProductMutation, useDeleteProductMutation, useGetAllProductsQuery } from "../../Redux/Apis/productApi";

const { Option } = Select;

const Products = () => {
  const { data, isLoading: fetching, isError, error } = useGetProfileQuery();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const filterParams = {
    search: searchText,
    isFeatured: filter === "featured" ? true : filter === "notFeatured" ? false : undefined,
    isApproved: filter === "approved" ? true : filter === "notApproved" ? false : undefined,
    page,
  };

  const { data: products, isLoading, isFetching } = useGetAllProductsQuery(filterParams);
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
        loading={isLoading || isFetching}
        rowKey="_id"
        dataSource={products?.data}
        columns={columns}
        pagination={{
          pageSize: products?.pagination?.itemsPerPage || 10,
          total: products?.pagination?.totalItems,
          // showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          onChange: (page) => {
            setPage(page)
          },
        }}
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
