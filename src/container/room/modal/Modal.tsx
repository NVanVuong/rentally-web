import { IModal } from "@/interfaces/modal.interface"
import { Button, Form, Input, Spin } from "antd"
import UploadImage from "@/components/RoomCard/Upload"
import { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useAppDispatch } from "@/redux/hook"
import { generateRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { IRoom } from "@/interfaces/room.interface"

const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 }
    //...
]

const Modal = (props: IModal) => {
    const [form] = Form.useForm()
    const dispath = useAppDispatch()
    const [selectedOptions, setSelectedOptions] = useState([])

    const handleChange = (event, value: any) => {
        setSelectedOptions(value)
    }
    const handleValuesChange = (changedValues: any, allValues: any) => {
        console.log("Changed Values:", changedValues)
        console.log("All Values:", allValues)
    }

    const onFinish = (values: any) => {
        values.files = JSON.stringify(values.files.fileList)
        const {quantity, ...roomPattern} = values
        console.log({roomPattern: roomPattern as IRoom,quantity:quantity})
        dispath(generateRoom({roomPattern: roomPattern as IRoom,quantity:quantity}))
    }

    useEffect(() => {
       
        form.setFieldsValue({
            utility: selectedOptions
        })
    }, [selectedOptions, form])

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
                    <div className="flex gap-8">
                        <Form.Item
                            className="w-full"
                            name="area"
                            rules={[{ required: true, message: "Please input area!" }]}
                        >
                            <Input placeholder="Area" />
                        </Form.Item>
                        <Form.Item
                            className="w-full"
                            name="price"
                            rules={[{ required: true, message: "Please input price!" }]}
                        >
                            <Input placeholder="Price" />
                        </Form.Item>
                    </div>
                    <div className="flex gap-8">
                        <Form.Item
                            className="w-full"
                            name="depositAmount"
                            rules={[{ required: true, message: "Please input deposit amount" }]}
                        >
                            <Input placeholder="Deposit amount" />
                        </Form.Item>
                        <Form.Item
                            className="w-full"
                            name="quantity"
                            rules={[{ required: true, message: "Please input quantity!" }]}
                        >
                            <Input placeholder="Quantity" />
                        </Form.Item>
                    </div>

                    <div className="w-full pb-6">
                        <Autocomplete
                            onChange={handleChange}
                            multiple
                            id="tags-outlined"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label="Utilities" placeholder="New util" />}
                        />
                        <Form.Item
                            className="hidden w-full"
                            name="utility"
                            rules={[{ required: true, message: "Please input utility!" }]}
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
