import React, { useState } from "react";
import { Form, Input, Switch, DatePicker, Button, Upload } from "antd";
import { TbCopyCheckFilled } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useAddBannerMutation, useUpdateBannerMutation } from "../../Redux/Apis/bannerApi"; // Replace with correct path
import { UploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import moment from "moment";

const { RangePicker } = DatePicker;

const Banner_Form = ({ closeModal, initialData = null }) => {
    const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
    const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

    const [dateRange, setDateRange] = useState(
        initialData?.startDate && initialData?.endDate
            ? [moment(initialData.startDate), moment(initialData.endDate)] // Use moment for initial values
            : null
    );
    const [fileList, setFileList] = useState([]);

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleSubmit = async (values) => {
        toast.dismiss();

        // Prepare form data
        const formData = new FormData();
        if (fileList.length > 0) {
            formData.append("img", fileList[0].originFileObj);
        }
        formData.append("link", values.link || "");
        formData.append("isActive", values.isActive);
        if (dateRange) {
            formData.append("startDate", dateRange[0].toISOString());
            formData.append("endDate", dateRange[1].toISOString());
        }

        if (initialData) {
            // Update banner
            formData.append("_id", initialData._id);
            updateBanner({ id: initialData._id, data: formData })
                .unwrap()
                .then(() => {
                    toast.success("Banner updated successfully");
                    closeModal();
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Failed to update banner");
                });
        } else {
            // Add new banner
            addBanner(formData)
                .unwrap()
                .then(() => {
                    toast.success("Banner created successfully");
                    closeModal();
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Failed to create banner");
                });
        }
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <p className="heading text-center my-4 capitalize text-xl font-bold">
                {initialData ? "Edit Banner" : "Add New Banner"}
            </p>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    link: initialData?.link || "",
                    isActive: initialData?.isActive || true,
                }}
            >
                {/* Image Upload */}
                <Form.Item
                    label="Banner Image"
                    name="img"
                    rules={[
                        {
                            required: !initialData,
                            message: "Please upload the banner image",
                        },
                    ]}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false} // Prevent automatic upload
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                {/* Link */}
                <Form.Item
                    label="Link (Optional)"
                    name="link"
                    rules={[
                        {
                            type: "url",
                            message: "Please enter a valid URL",
                        },
                    ]}
                >
                    <Input className="input" placeholder="Enter link (optional)" />
                </Form.Item>

                {/* Active Toggle */}
                <Form.Item
                    label="Active Status"
                    name="isActive"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                {/* Date Range */}
                <Form.Item label="Banner Duration (Optional)">
                    <RangePicker
                        className="w-full"
                        value={dateRange}
                        onChange={(dates) => setDateRange(dates)}
                    />
                </Form.Item>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="button-black"
                        type="submit"
                        disabled={isAdding || isUpdating}
                    >
                        <TbCopyCheckFilled size={20} className="mr-2" />
                        Save
                    </button>
                    <button
                        onClick={closeModal}
                        className="button-red"
                        type="button"
                    >
                        <RxCross2 size={20} className="mr-2" />
                        Cancel
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Banner_Form;
