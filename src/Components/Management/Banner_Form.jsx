import React, { useState } from "react";
import { Form, Input, Switch, DatePicker, Button } from "antd";
import { TbCopyCheckFilled } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useAddBannerMutation, useUpdateBannerMutation } from "../../Redux/Apis/bannerApi"; // Replace with correct path
import toast from "react-hot-toast";

const { RangePicker } = DatePicker;

const Banner_Form = ({ closeModal, initialData = null }) => {
    const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
    const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

    const [dateRange, setDateRange] = useState(
        initialData?.startDate && initialData?.endDate
            ? [new Date(initialData.startDate), new Date(initialData.endDate)]
            : null
    );

    const handleSubmit = async (values) => {
        toast.dismiss();
        const payload = {
            ...values,
            startDate: dateRange ? dateRange[0] : null,
            endDate: dateRange ? dateRange[1] : null,
        };

        if (initialData) {
            // Update banner
            updateBanner({ id: initialData._id, data: payload })
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
            addBanner(payload)
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
                    img: initialData?.img || "",
                    link: initialData?.link || "",
                    isActive: initialData?.isActive || true,
                }}
            >
                {/* Image URL */}
                <Form.Item
                    label="Banner Image URL"
                    name="img"
                    rules={[{ required: true, message: "Please enter the image URL" }]}
                >
                    <Input className="input" placeholder="Enter image URL" />
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
