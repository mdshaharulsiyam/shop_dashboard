// import { Form, Input, Button, Popover } from "antd";
// import { RxCross2 } from "react-icons/rx";
// import { TbCopyCheckFilled } from "react-icons/tb";
// import EmojiPicker from "emoji-picker-react"; // Install this package
// import React, { useState } from "react";

// const Category_Form = () => {
//   const [emoji, setEmoji] = useState(""); // To store the selected emoji
//   const [isPickerVisible, setIsPickerVisible] = useState(false); // To toggle emoji picker visibility

//   const handleEmojiSelect = (emojiObject) => {
//     setEmoji(emojiObject.emoji);
//     setIsPickerVisible(false); // Close the popover after emoji selection
//   };

//   const handleSubmit = (values) => {
//     console.log("Form Values:", values);
//   };

//   return (
//     <div className="max-w-[600px] mx-auto">
//       <p className="heading text-center my-4 capitalize text-xl font-bold">
//         Add New Category
//       </p>
//       <Form layout="vertical" onFinish={handleSubmit} initialValues={{ categoryName: "", emoji }}>
//         {/* Category Name Field */}
//         <Form.Item
//           label="Category Name"
//           name="categoryName"
//           rules={[{ required: true, message: "Please enter the category name" }]}
//         >
//           <Input placeholder="Enter category name" />
//         </Form.Item>

//         {/* Emoji Field with Popover */}
//         <Form.Item
//           label="Select Emoji"
//           name="emoji"
//           rules={[{ required: true, message: "Please select an emoji" }]}
//         >
//           <Input
//             placeholder="Select an emoji"
//             value={emoji}
//             suffix={
//               <Popover
//                 content={
//                   <EmojiPicker onEmojiClick={handleEmojiSelect} />
//                 }
//                 trigger="click"
//                 visible={isPickerVisible}
//                 onVisibleChange={(visible) => setIsPickerVisible(visible)}
//               >
//                 <Button type="text" className="flex items-center justify-center">
//                   😊
//                 </Button>
//               </Popover>
//             }
//             readOnly
//           />
//         </Form.Item>

//         {/* Buttons */}
//         <div className="flex justify-center gap-4 mt-6">
//           <button className="button-black" type="submit">
//             <TbCopyCheckFilled size={20} className="mr-2" />
//             Save
//           </button>
//           <button
//             onClick={() => console.log("Cancel Clicked")}
//             className="button-red"
//             type="button"
//           >
//             <RxCross2 size={20} className="mr-2" />
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default Category_Form;
import React, { useState } from "react";
import { Form, Input, Button, Popover } from "antd";
import Picker from "@emoji-mart/react"; // Emoji Mart Picker
import { RxCross2 } from "react-icons/rx";
import { TbCopyCheckFilled } from "react-icons/tb";

const Category_Form = () => {
    const [emoji, setEmoji] = useState(""); // To store the selected emoji
    const [isPickerVisible, setIsPickerVisible] = useState(false); // To toggle emoji picker visibility

    const handleEmojiSelect = (emoji) => {
        if (emoji?.native) {
            setEmoji(emoji.native); // Set the emoji as the input value
        }
    };

    const handleVisibleChange = (visible) => {
        setIsPickerVisible(visible); // Safely toggle the visibility
    };

    const handleSubmit = (values) => {
        console.log("Form Values:", { ...values, emoji });
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <p className="heading text-center my-4 capitalize text-xl font-bold">
                Add New Category
            </p>
            <Form
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ categoryName: "", emoji }}
            >
                {/* Category Name Field */}
                <Form.Item
                    label="Category Name"
                    name="categoryName"
                    rules={[{ required: true, message: "Please enter the category name" }]}
                >
                    <Input placeholder="Enter category name" />
                </Form.Item>

                {/* Emoji Field with Popover */}
                <Form.Item
                    label="Select Emoji"
                    name="emoji"
                    rules={[{ required: true, message: "Please select an emoji" }]}
                >
                    <Popover
                        content={
                            isPickerVisible && (
                                <div onClick={(e) => e.stopPropagation() /* Prevent closing on interactions */}>
                                    <Picker onEmojiSelect={handleEmojiSelect} theme="light" />
                                </div>
                            )
                        }
                        visible={isPickerVisible}
                        onVisibleChange={handleVisibleChange}
                    >
                        <Input
                            placeholder="Select an emoji"
                            value={emoji}
                            readOnly
                            suffix={
                                <Button onClick={() => setIsPickerVisible(true)} type="text" className="flex items-center justify-center">
                                    😊
                                </Button>
                            }
                        />
                    </Popover>
                </Form.Item>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button className="button-black" type="submit">
                        <TbCopyCheckFilled size={20} className="mr-2" />
                        Save
                    </button>
                    <button
                        onClick={() => console.log("Cancel Clicked")}
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

export default Category_Form;



