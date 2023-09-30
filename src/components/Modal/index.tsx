import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
import { Modal, Button, Form, Input, Select, Upload, ConfigProvider, message } from "antd"
import { ROLE } from "@/utils/constants/GlobalConst"
import { AiOutlineUpload } from "react-icons/ai"
import "./style.css"
import ModalTitle from "./ModalTitle"
import { useCreateUserMutation } from "@/redux/services/user/user.service"

const ModalAntd = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const [createUser] = useCreateUserMutation()

    const normFile = (e: any) => {
        console.log("Upload event:", e)
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    const validateMessages = {
        required: "'${name}' is required!"
    }

    const onFinish = (values: any) => {
        console.log("Received values of form:", values)

        if (values.photo && values.photo.length > 0) {
            values = {
                ...values,
                photo: values.photo[0]
            }
            createUser(values)
        }
    }

    const handleChange = async (info: any) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`)
            console.log(info.file.originFileObj)
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E36414"
                }
            }}
            form={{ validateMessages }}
        >
            <Modal open={isOpen} onCancel={() => dispatch(closeModal())} footer={null}>
                <ModalTitle />
                <Form
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!"
                            },
                            {
                                required: true,
                                message: "Please input E-mail!"
                            }
                        ]}
                    >
                        <Input className="w-full" placeholder="Email" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please inpur " }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="firstName" rules={[{ required: true }]}>
                        <Input placeholder="Firstname" />
                    </Form.Item>
                    <Form.Item name="lastName" rules={[{ required: true }]}>
                        <Input placeholder="Lastname" />
                    </Form.Item>
                    <Form.Item name="phoneNumber" rules={[{ required: true }]}>
                        <Input placeholder="Phone" />
                    </Form.Item>
                    <Form.Item
                        name="photo"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true }]}
                    >
                        <Upload
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture"
                            onChange={handleChange}
                        >
                            <Button
                                icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                className="flex flex-row-reverse items-center justify-between gap-2"
                            >
                                Upload photo
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item name="role" rules={[{ required: true }]}>
                        <Select placement="topRight" placeholder="Role">
                            <Select.Option value={ROLE.ADMIN}>Admin</Select.Option>
                            <Select.Option value={ROLE.MOD}>Mod</Select.Option>
                            <Select.Option value={ROLE.USER}>User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </ConfigProvider>
    )
}

export default ModalAntd
