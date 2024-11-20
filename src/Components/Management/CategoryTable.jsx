import React from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetCategoryQuery } from "../../Redux/Apis/categoryApi";

const CategoryTable = ({ onEdit }) => {
    const data = [];
    const { data: category } = useGetCategoryQuery()
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
                    <button style={{
                        padding: '6px'
                    }} className="button-black" onClick={() => onEdit(record)}>
                        <MdEdit size={18} />
                    </button>
                    <button style={{
                        padding: '6px'
                    }} className="button-red" onClick={() => console.log("Delete", record)}>
                        <MdDelete size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return <Table rowKey="_id" dataSource={category?.data || []} columns={columns} />;
};

export default CategoryTable;
