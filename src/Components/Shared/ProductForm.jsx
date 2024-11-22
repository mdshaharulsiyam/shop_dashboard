import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Upload, Switch, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useGetCategoryQuery } from "../../Redux/Apis/categoryApi";
import { useGetSubcategoriesQuery } from "../../Redux/Apis/subcategoryApi";
import { useCreateProductMutation, useUpdateProductMutation } from "../../Redux/Apis/productApi";

const { Option } = Select;

const ProductForm = ({ visible, onClose, product }) => {
    const [form] = Form.useForm();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const { data: category } = useGetCategoryQuery();
    const { data: subCategory } = useGetSubcategoriesQuery();

    const [description, setDescription] = useState(product?.description || "");
    const [fileList, setFileList] = useState(
        product?.img?.map((url, index) => ({
            uid: index,
            name: `image-${index}`,
            url,
        })) || []
    );
    const [couponAvailable, setCouponAvailable] = useState(product?.coupon?.available || false);

    useEffect(() => {
        if (product) {
            form.setFieldsValue(product);
            setDescription(product.description || "");
            setFileList(
                product.img?.map((url, index) => ({
                    uid: index,
                    name: `image-${index}`,
                    url,
                })) || []
            );
            setCouponAvailable(product?.coupon?.available || false);
        } else {
            form.resetFields();
            setDescription("");
            setFileList([]);
            setCouponAvailable(false);
        }
    }, [product, form]);

    const handleFinish = async (values) => {
        try {
            const payload = {
                ...values,
                description,
                img: fileList.map((file) => file.url || file.response?.url),
            };

            if (payload.img.length > 4) {
                toast.error("You can upload a maximum of 4 images.");
                return;
            }

            if (product) {
                // Update product
                await updateProduct({ id: product._id, updatedData: payload }).unwrap();
                toast.success("Product updated successfully");
            } else {
                // Create product
                await createProduct(payload).unwrap();
                toast.success("Product created successfully");
            }
            onClose();
        } catch (error) {
            toast.error("Failed to save product");
        }
    };

    const handleUploadChange = ({ fileList: newFileList }) => {
        if (newFileList.length <= 4) {
            setFileList(newFileList);
        } else {
            toast.error("You can upload a maximum of 4 images.");
        }
    };

    return (
        <Modal
            title={product ? "Update Product" : "Create Product"}
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose} style={{ height: 42 }}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()} style={{ height: 42 }}>
                    {product ? "Update" : "Create"}
                </Button>,
            ]}
            width={900}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                initialValues={product || { stock: 0, price: 0, coupon: { available: false } }}
            >
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                    {/* Name */}
                    <Form.Item
                        name="name"
                        label={<span style={{ color: "#555" }}>Product Name</span>}
                        rules={[{ required: true, message: "Please enter the product name" }]}
                    >
                        <Input style={{ height: 42 }} />
                    </Form.Item>

                    {/* Price */}
                    <Form.Item
                        name="price"
                        label={<span style={{ color: "#555" }}>Price</span>}
                        rules={[{ required: true, message: "Please enter the product price" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Discount */}
                    <Form.Item
                        name="discount"
                        label={<span style={{ color: "#555" }}>Discount (%)</span>}
                    >
                        <InputNumber min={0} max={100} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Stock */}
                    <Form.Item
                        name="stock"
                        label={<span style={{ color: "#555" }}>Stock</span>}
                        rules={[{ required: true, message: "Please enter the stock quantity" }]}
                    >
                        <InputNumber min={0} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Category */}
                    <Form.Item
                        name="category"
                        label={<span style={{ color: "#555" }}>Category</span>}
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select placeholder="Select a category" style={{ height: 42 }}>
                            {category?.data?.map((cat) => (
                                <Option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Subcategory */}
                    <Form.Item
                        name="subCategory"
                        label={<span style={{ color: "#555" }}>Subcategory</span>}
                        rules={[{ required: true, message: "Please select a subcategory" }]}
                    >
                        <Select placeholder="Select a subcategory" style={{ height: 42 }}>
                            {subCategory?.data?.map((subCat) => (
                                <Option key={subCat._id} value={subCat._id}>
                                    {subCat.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Coupon Toggle */}
                    <Form.Item label={<span style={{ color: "#555" }}>Coupon</span>} className="col-span-2">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                            <div>
                                <Switch
                                    checked={couponAvailable}
                                    onChange={(checked) => setCouponAvailable(checked)}
                                    style={{ alignSelf: "center" }}
                                />
                            </div>
                            <Form.Item
                                name={["coupon", "couponCode"]}
                                style={{ margin: 0 }}
                                rules={[{ required: true, message: "Please enter the coupon code" }]}
                            >
                                <Input 
                                    style={{ height: 42 }}
                                    placeholder="Enter Coupon Code"
                                    disabled={!couponAvailable}
                                />
                            </Form.Item>
                        </div>
                    </Form.Item>

                    {/* Image Upload Pa$$w0rd! */}
                    <Form.Item className="col-span-2" label={<span style={{ color: "#555" }}>Images</span>}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            action="https://api.cloudinary.com/v1_1/demo/image/upload" // Replace with your API endpoint
                            data={{ upload_preset: "your_preset" }} // Replace with your upload preset
                            multiple
                        >
                            {fileList.length < 4 && (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </div>

                {/* Description */}
                <Form.Item label={<span style={{ color: "#555" }}>Description</span>}>
                    <JoditEditor
                        value={description}
                        onBlur={(value) => setDescription(value)}
                        config={{
                            readonly: false,
                            placeholder: "Enter product description...",
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductForm;
