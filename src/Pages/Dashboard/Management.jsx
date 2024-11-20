import React, { Suspense, useState } from "react";
import PageHeading from "../../Components/Shared/PageHeading";
import { TiPlus } from "react-icons/ti";
import CategoryTable from "../../Components/Management/CategoryTable";
import BannerTable from "../../Components/Management/BannerTable";
import { Modal } from "antd";
import Category_Form from "../../Components/Management/Category_Form";
import Banner_Form from "../../Components/Management/Banner_Form"; 

const Management = () => {
    const [isCategory, setIsCategory] = useState(true); // Toggle between category and banner
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null); // Selected data for edit
    const [action, setAction] = useState("add"); // Add or edit action

    // Open modal with appropriate action
    const openModal = (isEdit = false, data = null) => {
        setAction(isEdit ? "edit" : "add");
        setSelectedData(data);
        setModalVisible(true);
    };

    // Close modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedData(null); // Clear selected data
    };

    return (
        <div className="bg-[var(--bg-white)] p-4 rounded-md">
            <PageHeading text={`Management`} />
            <div className="between-center my-4">
                <div className="start-center gap-6">
                    <button
                        onClick={() => setIsCategory(true)}
                        className={`${isCategory ? "button-black" : "button-white"}`}
                    >
                        Category
                    </button>
                    <button
                        onClick={() => setIsCategory(false)}
                        className={`${!isCategory ? "button-black" : "button-white"}`}
                    >
                        Banner
                    </button>
                </div>
                <button
                    onClick={() => openModal(false)} // Add operation
                    className="button-black"
                >
                    <TiPlus size={24} /> Add {isCategory ? "Category" : "Banner"}
                </button>
            </div>

            {isCategory ? (
                <Suspense fallback={""}>
                    <CategoryTable
                        onEdit={(data) => openModal(true, data)} // Trigger edit modal for category
                    />
                </Suspense>
            ) : (
                <Suspense fallback={""}>
                    <BannerTable
                        onEdit={(data) => openModal(true, data)} // Trigger edit modal for banner
                    />
                </Suspense>
            )}

            <Modal
                open={modalVisible}
                onCancel={closeModal}
                centered
                footer={null}
                destroyOnClose
            >
                {isCategory ? (
                    <Category_Form
                        closeModal={closeModal}
                        initialData={selectedData}
                    />
                ) : (
                    <Banner_Form
                        closeModal={closeModal}
                        initialData={selectedData}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Management;
