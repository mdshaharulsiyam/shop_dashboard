import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";
import { useCreateCouponMutation, useUpdateCouponMutation } from "../../Redux/Apis/couponApi";
import toast from "react-hot-toast";

const Coupon_Form = ({ closeModal, initialData }) => {
    const [form] = Form.useForm();
    const [createCoupon] = useCreateCouponMutation();
    const [updateCoupon] = useUpdateCouponMutation();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleFinish = async (values) => {
        try {
            if (initialData) {
                // Update coupon
                await updateCoupon({ id: initialData._id, ...values }).unwrap();
                toast.success("Coupon updated successfully");
            } else {
                // Create coupon
                await createCoupon(values).unwrap();
                toast.success("Coupon created successfully");
            }
            closeModal();
        } catch (error) {
            toast.error("Failed to save coupon");
        }
    };

    return (
        <Card bordered={false} style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Coupon Name"
                    rules={[{ required: true, message: "Please enter the coupon name" }]}
                >
                    <Input placeholder="Enter coupon name" />
                </Form.Item>
                <Form.Item
                    name="percentage"
                    label="Discount (%)"
                    rules={[
                        { required: true, message: "Please enter the discount percentage" },
                        { type: "number", min: 0, max: 100, message: "Percentage must be between 0 and 100" },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter discount percentage"
                        min={0}
                        max={100}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <Form.Item
                    name="totalAvailable"
                    label="Total Available"
                    rules={[
                        { required: true, message: "Please enter the total available count" },
                        { type: "number", min: 1, message: "Total available must be at least 1" },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter total available count"
                        min={1}
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                <div className="flex justify-end gap-4">
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type="primary" htmlType="submit">
                        {initialData ? "Update" : "Create"}
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default Coupon_Form;
