import React, { useState, useEffect } from "react";
import { Form, Input, Button, Popover, Select } from "antd";
import Picker from "@emoji-mart/react";
import { TbCopyCheckFilled } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useAddSubcategoryMutation, useUpdateSubcategoryMutation } from "../../Redux/Apis/subcategoryApi"; 
import { useGetCategoryQuery } from "../../Redux/Apis/categoryApi"; // Fetch categories
import toast from "react-hot-toast";

const Subcategory_Form = ({ closeModal, initialData = null }) => {
    const [addSubcategory, { isLoading: isAdding }] = useAddSubcategoryMutation();
    const [updateSubcategory, { isLoading: isUpdating }] = useUpdateSubcategoryMutation();
    const { data: categories } = useGetCategoryQuery(); // Fetch categories for selection

    const [emoji, setEmoji] = useState(initialData?.img || "");
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const handleEmojiSelect = (emoji) => {
        if (emoji?.native) {
            setEmoji(emoji.native);
        }
    };

    const handleSubmit = async (values) => {
        toast.dismiss();
        if (!emoji) return toast.error("Please Select a Subcategory Emoji");
        const payload = { ...values, img: emoji };
        if (initialData) {
            updateSubcategory({ id: initialData._id, data: payload })
                .unwrap()
                .then(() => {
                    toast.success("Subcategory updated successfully");
                    closeModal();
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Failed to update subcategory");
                });
        } else {
            addSubcategory(payload)
                .unwrap()
                .then(() => {
                    toast.success("Subcategory created successfully");
                    closeModal();
                })
                .catch((err) => {
                    toast.error(err?.data?.message || "Failed to create subcategory");
                });
        }
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <p className="heading text-center my-4 capitalize text-xl font-bold">
                {initialData ? "Edit Subcategory" : "Add New Subcategory"}
            </p>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    name: initialData?.name || "",
                    categoryId: initialData?.categoryId || "",
                }}
            >
                {/* Subcategory Name */}
                <Form.Item
                    label="Subcategory Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the subcategory name" }]}
                >
                    <Input placeholder="Enter subcategory name" />
                </Form.Item>

                {/* Parent Category */}
                <Form.Item
                    label="Parent Category"
                    name="categoryId"
                    rules={[{ required: true, message: "Please select a category" }]}
                >
                    <Select
                        placeholder="Select a category"
                        options={categories?.map((category) => ({
                            label: category.name,
                            value: category._id,
                        }))}
                    />
                </Form.Item>

                {/* Emoji Picker */}
                <Form.Item label="Select Emoji" name="emoji">
                    <Popover
                        content={
                            isPickerVisible && (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <Picker onEmojiSelect={handleEmojiSelect} theme="light" />
                                </div>
                            )
                        }
                        visible={isPickerVisible}
                        onVisibleChange={setIsPickerVisible}
                    >
                        <Input
                            placeholder="Select an emoji"
                            value={emoji}
                            readOnly
                            suffix={
                                <Button
                                    onClick={() => setIsPickerVisible(true)}
                                    type="text"
                                    className="flex items-center justify-center"
                                >
                                    😊
                                </Button>
                            }
                        />
                    </Popover>
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
                    <button onClick={closeModal} className="button-red" type="button">
                        <RxCross2 size={20} className="mr-2" />
                        Cancel
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default Subcategory_Form;
