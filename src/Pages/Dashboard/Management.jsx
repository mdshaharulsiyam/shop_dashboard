import React, { Suspense, useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import { TiPlus } from "react-icons/ti";
import CategoryTable from "../../Components/Management/CategoryTable";
import BannerTable from "../../Components/Management/BannerTable";
import SubcategoryTable from "../../Components/Management/SubcategoryTable"; // New Subcategory Table
import { Modal } from "antd";
import Category_Form from "../../Components/Management/Category_Form";
import Subcategory_Form from "../../Components/Management/Subcategory_Form"; // New Subcategory Form
import Banner_Form from "../../Components/Management/Banner_Form";

const Management = () => {
    const [activeTab, setActiveTab] = useState("category"); // "category", "banner", or "subcategory"
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null); // Selected data for edit
    const [action, setAction] = useState("add"); // Add or edit action

    const openModal = (isEdit = false, data = null) => {
        setAction(isEdit ? "edit" : "add");
        setSelectedData(data);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedData(null);
    };

    return (
        <div className="bg-[var(--bg-white)] p-4 rounded-md">
            <PageHeading text={`Management`} />
            <div className="between-center my-4">
                <div className="start-center gap-6">
                    <button
                        onClick={() => setActiveTab("category")}
                        className={`${activeTab === "category" ? "button-black" : "button-white"}`}
                    >
                        Category
                    </button>
                    <button
                        onClick={() => setActiveTab("banner")}
                        className={`${activeTab === "banner" ? "button-black" : "button-white"}`}
                    >
                        Banner
                    </button>
                    <button
                        onClick={() => setActiveTab("subcategory")}
                        className={`${activeTab === "subcategory" ? "button-black" : "button-white"}`}
                    >
                        Subcategory
                    </button>
                </div>
                <button
                    onClick={() => openModal(false)} // Add operation
                    className="button-black"
                >
                    <TiPlus size={24} /> Add {activeTab === "category" ? "Category" : activeTab === "banner" ? "Banner" : "Subcategory"}
                </button>
            </div>

            {activeTab === "category" && (
                <Suspense fallback={""}>
                    <CategoryTable onEdit={(data) => openModal(true, data)} />
                </Suspense>
            )}
            {activeTab === "banner" && (
                <Suspense fallback={""}>
                    <BannerTable onEdit={(data) => openModal(true, data)} />
                </Suspense>
            )}
            {activeTab === "subcategory" && (
                <Suspense fallback={""}>
                    <SubcategoryTable onEdit={(data) => openModal(true, data)} />
                </Suspense>
            )}

            <Modal
                open={modalVisible}
                onCancel={closeModal}
                centered
                footer={null}
                destroyOnClose
            >
                {activeTab === "category" && (
                    <Category_Form closeModal={closeModal} initialData={selectedData} />
                )}
                {activeTab === "banner" && (
                    <Banner_Form closeModal={closeModal} initialData={selectedData} />
                )}
                {activeTab === "subcategory" && (
                    <Subcategory_Form closeModal={closeModal} initialData={selectedData} />
                )}
            </Modal>
        </div>
    );
};

export default Management;
