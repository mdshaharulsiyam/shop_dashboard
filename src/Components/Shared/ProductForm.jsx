import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, Upload, Switch, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useGetCategoryQuery } from "../../Redux/Apis/categoryApi";
import { useGetSubcategoriesQuery } from "../../Redux/Apis/subcategoryApi";
import { useCreateProductMutation, useUpdateProductMutation } from "../../Redux/Apis/productApi";
import { useGetCouponsQuery } from "../../Redux/Apis/couponApi";

const { Option } = Select;

const ProductForm = ({ visible, onClose, product }) => {
    const [deletedImages, setDeletedImages] = useState([]);

    const [categoryId, setCategory] = useState(null)
    const [form] = Form.useForm();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    const { data: category } = useGetCategoryQuery();
    const { data: coupon } = useGetCouponsQuery();
    const { data: subCategory } = useGetSubcategoriesQuery({ category: categoryId || "" });

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
            form.setFieldsValue({ ...product, category: product?.category?._id, subCategory: product?.subCategory?._id });
            setDescription(product.description || "");
            const existingFiles = product.img?.map((url, index) => ({
                uid: `existing-${index}`,
                name: `image-${index}`,
                url,
            })) || [];
            setFileList(existingFiles);
            setCouponAvailable(product?.coupon?.available || false);
        } else {
            form.resetFields();
            setDescription("");
            setFileList([]);
            setCouponAvailable(false);
        }
    }, [product, form]);

    const handleFinish = async (values) => {
        const retainedImages = fileList.filter((file) => file.url).map((file) => file.url)
        try {
            const payload = {
                ...values,
                description,
                retainedImages: JSON.stringify(retainedImages),
                deletedImages: JSON.stringify(deletedImages),
            };
            const formData = new FormData()
            Object.keys(payload).map(key => {
                formData.append(key, payload[key])
            })
            if (product) {

                // Update product
                if (fileList) {
                    fileList
                        .filter((file) => !file.url)
                        .forEach((file) => {
                            formData.append("img", file.originFileObj);
                        });
                }
                await updateProduct({ id: product._id, updatedData: formData }).unwrap();
                toast.success("Product updated successfully");
            } else {
                if (fileList && fileList.length < 0) {
                    return toast.error('Please Select image')
                }
                fileList.map(item => {
                    formData.append('img', item?.originFileObj)
                })
                await createProduct(formData).unwrap();
                toast.success("Product created successfully");
            }
            onClose();
        } catch (error) {
            console.log(error)
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
    const handleRemove = (file) => {
        if (file.url) {
            setDeletedImages((prev) => [...prev, file.url]);
        }
        setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
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
                        <InputNumber type="number" min={0} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Discount */}
                    <Form.Item
                        name="discount"
                        label={<span style={{ color: "#555" }}>Discount (%)</span>}
                    >
                        <InputNumber type="number" min={0} max={100} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Stock */}
                    <Form.Item
                        name="stock"
                        label={<span style={{ color: "#555" }}>Stock</span>}
                        rules={[{ required: true, message: "Please enter the stock quantity" }]}
                    >
                        <InputNumber type="number" min={0} style={{ width: "100%", height: 42 }} />
                    </Form.Item>

                    {/* Category */}
                    <Form.Item
                        name="category"
                        label={<span style={{ color: "#555" }}>Category</span>}
                        rules={[{ required: true, message: "Please select a category" }]}
                    >
                        <Select onChange={(value) => setCategory(value)} placeholder="Select a category" style={{ height: 42 }}>
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
                                rules={[{ required: couponAvailable, message: "Please enter the coupon code" }]}
                            >
                                <Select disabled={!couponAvailable} placeholder="Select a Coupon" style={{ height: 42 }}>
                                    {coupon?.data?.map((cop) => (
                                        <Option key={cop._id} value={cop._id}>
                                            {cop.name} {cop.percentage}%
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </Form.Item>

                    {/* Image Upload Pa$$w0rd! */}
                    <Form.Item className="col-span-2" label={<span style={{ color: "#555" }}>Images</span>}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            // action="https://api.cloudinary.com/v1_1/demo/image/upload" 
                            // data={{ upload_preset: "your_preset" }}
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
