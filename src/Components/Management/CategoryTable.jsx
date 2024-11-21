import React from "react";
import { Popconfirm, Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetCategoryQuery, useDeleteCategoryMutation } from "../../Redux/Apis/categoryApi";
import toast from "react-hot-toast";

const CategoryTable = ({ onEdit }) => {
    const { data: category } = useGetCategoryQuery();
    const [deleteCategory] = useDeleteCategoryMutation(); // Use the mutation hook

    const onDelete = async (record) => {
        deleteCategory(record._id).unwrap()
            .then(res => {
                console.log(res)
                toast.success(res?.message)
            }).catch(err => { 
                console.log(err)
                toast.error(err?.data?.message)
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
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <button
                        style={{
                            padding: "6px",
                        }}
                        className="button-black"
                        onClick={() => onEdit(record)}
                    >
                        <MdEdit size={18} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        description="This action cannot be undone."
                        onConfirm={() => onDelete(record)} // Trigger the mutation
                        onCancel={() => console.log("Cancel delete")}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <button
                            style={{
                                padding: "6px",
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

    return <Table rowKey="_id" dataSource={category?.data || []} columns={columns} />;
};

export default CategoryTable;
