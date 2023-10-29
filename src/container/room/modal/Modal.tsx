import { IModal } from "@/interfaces/modal.interface"
import { Button, Form, Input, InputNumber, Spin } from "antd"
import UploadImage from "@/components/Upload"
import { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useAppDispatch } from "@/redux/hook"
import { generateRoom, saveSrcImage } from "@/redux/features/generateRoom/generateRoom.slice"
import { IRoom } from "@/interfaces/room.interface"
import { useNavigate } from "react-router-dom"

import { closeModal } from "@/redux/features/modal/modal.slice"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { IUtiltity } from "@/interfaces/utility.interface"
import TypedInputNumber from "antd/es/input-number"

const Modal = (props: IModal) => {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])
    const navigate = useNavigate()
    const { data } = useGetUtilitiesQuery("")

    useEffect(() => {
        form.setFieldsValue({
            utilities: selectedOptions.map((selectedOption) => selectedOption.id)
        })
    }, [selectedOptions, form])

    const handleChange = (event: any, value: any) => {
        setSelectedOptions(value)
    }
    const handleValuesChange = (changedValues: any, allValues: any) => {
        console.log("Changed Values:", changedValues)
        console.log("All Values:", allValues)
    }

    const onFinish = (values: any) => {
        dispatch(closeModal())
        const srcImage = values.images.fileList[0].thumbUrl

        dispatch(saveSrcImage({ srcImage: JSON.stringify(srcImage) }))

        values.images = values.images.fileList.map((file: any) => file.originFileObj)

        const { quantity, ...roomPattern } = values
        dispatch(generateRoom({ roomPattern: roomPattern as IRoom, quantity: quantity }))
        navigate("/mod/props/generate-rooms")
    }

    return (
        <div>
            <Spin spinning={false}>
                <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">Create a book</div>

                <Form
                    form={form}
                    onValuesChange={handleValuesChange}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    className="flex w-full flex-col items-center"
                >
                    <div className="flex w-full gap-8">
                        <Form.Item
                            className="w-full"
                            name="area"
                            rules={[{ required: true, message: "Please input area!" }]}
                        >
                            <TypedInputNumber className="w-full" placeholder="Area" />
                        </Form.Item>
                        <Form.Item
                            className="w-full"
                            name="price"
                            rules={[{ required: true, message: "Please input price!" }]}
                        >
                            <TypedInputNumber className="w-full" placeholder="Price" />
                        </Form.Item>
                    </div>
                    <div className="flex gap-8">
                        <Form.Item
                            className="w-full"
                            name="depositAmount"
                            rules={[{ required: true, message: "Please input deposit amount" }]}
                        >
                            <TypedInputNumber className="w-full" placeholder="Deposit amount" />
                        </Form.Item>
                        <Form.Item
                            className="w-full"
                            name="quantity"
                            rules={[{ required: true, message: "Please input quantity!" }]}
                        >
                            <TypedInputNumber className="w-full" placeholder="Quantity" />
                        </Form.Item>
                    </div>

                    <div className="mb-6 w-full rounded-md border">
                        <Autocomplete
                            onChange={handleChange}
                            multiple
                            id="tags-outlined"
                            sx={{
                                // border: "1px solid blue",
                                "& .MuiOutlinedInput-root": {
                                    border: "0px solid #fff",
                                    borderRadius: "20px",
                                    padding: "0"
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: "none"
                                },
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    border: "0px solid #fff"
                                }
                            }}
                            options={data || []}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label="" placeholder="New util" />}
                        />
                        <Form.Item
                            className="hidden w-full"
                            name="utilities"
                            rules={[{ required: true, message: "Please input utilities!" }]}
                        >
                            <Input className="hidden h-0" />
                        </Form.Item>
                    </div>
                    <UploadImage />
                    <Form.Item className="w-full  pt-6">
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Finish
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    )
}

export default Modal
