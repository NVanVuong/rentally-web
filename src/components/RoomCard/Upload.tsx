import React, { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Modal, Upload } from "antd"
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface"

const UploadImage = () => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [previewTitle, setPreviewTitle] = useState("")
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    const handleCancel = () => setPreviewOpen(false)
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile)
        }

        setPreviewImage(file.url || (file.preview as string))
        setPreviewOpen(true)
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1))
    }

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList), console.log(newFileList)
    }

    const onRemove = (file: UploadFile) => {
        const index = fileList.indexOf(file)
        const newFileList = fileList.slice()
        newFileList.splice(index, 1)
        setFileList(newFileList)
    }
    const beforeUpload = (file: UploadFile) => {
        setFileList([...fileList, file])

        return false
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <div className="w-full rounded-lg border-[1px] border-[#d9d9d9] bg-white px-[34px] py-4">
            <Form.Item className="w-full" name="files" rules={[{ required: true, message: "Please input images!" }]}>
                <Upload
                    listType="picture-card"
                    onRemove={onRemove}
                    beforeUpload={beforeUpload}
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 9 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </div>
    )
}

export default UploadImage
