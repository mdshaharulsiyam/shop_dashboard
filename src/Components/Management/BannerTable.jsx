import React from "react";
import { Table } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";

const BannerTable = ({ onEdit }) => {
    const data = []; // Replace with your banner data

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <button className="button-black" onClick={() => onEdit(record)}>
                        <MdEdit size={18} />
                    </button>
                    <button className="button-red" onClick={() => console.log("Delete", record)}>
                        <MdDelete size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return <Table rowKey="_id" dataSource={data} columns={columns} />;
};

export default BannerTable;
