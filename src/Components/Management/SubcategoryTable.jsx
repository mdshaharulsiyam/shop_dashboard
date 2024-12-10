import React, { useState } from "react";
import { Table, Popconfirm } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetSubcategoriesQuery, useDeleteSubcategoryMutation } from "../../Redux/Apis/subcategoryApi";
import toast from "react-hot-toast";

const SubcategoryTable = ({ onEdit }) => {
    const [page, setPage] = useState(1)
    const { data: subCategory, isLoading, isFetching } = useGetSubcategoriesQuery({ page });
    const [deleteSubcategory] = useDeleteSubcategoryMutation();
    console.log(subCategory)
    const handleDelete = async (id, categoryId) => {
        deleteSubcategory({ id, categoryId }).unwrap()
            .then(res => {
                toast.success(res?.message || 'Sub Category Deleted')
            }).catch(err => {
                toast.error(err?.data?.message || 'Something went wrong')
            })
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
        },
        {
            title: "Parent Category",
            dataIndex: "categoryName",
            key: "categoryName",
            render: (_, record) => <p>{record?.category?.name}</p>
        },
        {
            title: "Total Product",
            dataIndex: "totalProduct",
            key: "totalProduct",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <button
                        style={{
                            padding: "5px",
                        }}
                        className="button-black"
                        onClick={() => onEdit(record)}
                    >
                        <MdEdit size={18} />
                    </button>

                    <Popconfirm
                        title="Are you sure to delete this subcategory?"
                        onConfirm={() => handleDelete(record._id, record.category?._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button
                            style={{
                                padding: "5px",
                            }}
                            className="button-red"
                        >
                            <MdDelete size={18} />
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return <Table
        loading={isLoading || isFetching}
        rowKey="_id"
        dataSource={subCategory?.data}
        columns={columns}
        pagination={{
            pageSize: subCategory?.pagination?.itemPerPage,
            total: subCategory?.pagination?.totalItems,
            onChange: (page) => setPage(page)
        }}
    />;
};

export default SubcategoryTable;
