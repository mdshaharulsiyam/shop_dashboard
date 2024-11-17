import { Input } from 'antd'
import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa6'
import { url } from '../../Utils/BaseUrl';

const ImageUpload = ({ accept, setFiles, Files, multiple, image }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileDrop = e => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.includes(accept));
        if (newFiles.length) {
            if (multiple) {
                setFiles([...Files, ...newFiles]);
            } else {
                setFiles([newFiles[0]]);
            }
            setIsDragging(false);
        } else {
            // toast.error(`Invalid ${accept}.`);
            setIsDragging(false);
        }
    };

    const onDragOver = e => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = e => {
        e.preventDefault();
        setIsDragging(false);
    };
    return (
        <label
            onDrop={fileDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            htmlFor='image' className={`center-center flex-col w-full gap-4 h-[250px] ${isDragging ? 'border-4 border-black' : 'border-2 border-dashed'}`}>
            {
                isDragging ? <p>drop here</p> : <div className=' w-full h-[250px] overflow-hidden center-center flex-col gap-4'>
                    {
                        Files.length <= 0 && !image && <p>Drop image file here to upload (or click)</p>
                    }
                    {
                        Files.length > 0 ? <img src={URL.createObjectURL(Files[0])} className=' h-full w-full object-contain' alt="" /> : image ? <img className=' h-full w-full object-contain' src={`${url}/${image}`} /> : <FaImage size={50} />
                    }
                </div>
            }
            <Input onChange={(e) => {
                if (multiple) {
                    setFiles([...Files, ...e.target.files])
                } else {
                    setFiles([e.target.files[0]])

                }
            }} accept={`${accept}/*`} id='image' style={{
                display: 'none'
            }} type='file' />
        </label>
    )
}

export default ImageUpload
