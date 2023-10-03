import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
import { Modal, Button, Form, Input, Select, Upload, ConfigProvider, message, Spin } from "antd"
import { MODAL, ROLE } from "@/utils/constants/GlobalConst"
import { AiOutlineUpload } from "react-icons/ai"
import "./style.css"
import ModalTitle from "./ModalTitle"
import { useCreateUserMutation, useGetUserByIdQuery } from "@/redux/services/user/user.service"
import { useEffect } from "react"
import { createUserFormData, normFile } from "@/utils/helpers"

const ModalAntd = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)
    const type = useAppSelector((state) => state.modal.type)
    const id = useAppSelector((state) => state.modal.id)
    console.log(id)

    const [createUser, { data, error, isLoading }] = useCreateUserMutation()

    const { data: userData } = useGetUserByIdQuery(id ?? "", { skip: type !== MODAL.UPDATE })
    console.log(userData?.data)

    useEffect(() => {
        if (data && data.status === "success") {
            message.success("Create user successfully")
            dispatch(closeModal())
        } else if (error) {
            message.error((error as any).data?.message)
        }
        // eslint-disable-next-line
    }, [data, error])

    const onFinish = async (values: any) => {
        const formData = createUserFormData(values)

        await createUser(formData)
    }

    const handleChange = async (info: any) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    console.log(type)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E36414"
                }
            }}
        >
            <Modal open={isOpen} onCancel={() => dispatch(closeModal())} footer={null}>
                <Spin spinning={isLoading}>
                    <ModalTitle />
                    <Form
                        key={userData?.data?.id}
                        onFinish={onFinish}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                        initialValues={{
                            email: type !== MODAL.ADD ? userData?.data?.email : undefined,
                            firstName: type !== MODAL.ADD ? userData?.data?.firstName : undefined,
                            lastName: type !== MODAL.ADD ? userData?.data?.lastName : undefined,
                            phoneNumber: type !== MODAL.ADD ? userData?.data?.phoneNumber : undefined,
                            role: type !== MODAL.ADD ? userData?.data?.role : undefined
                        }}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid email!"
                                },
                                {
                                    required: true,
                                    message: "Please input email!"
                                }
                            ]}
                        >
                            <Input className="w-full" placeholder="Email" />
                        </Form.Item>
                        {type === MODAL.ADD && (
                            <Form.Item name="password" rules={[{ required: true, message: "Please input password!" }]}>
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                        )}
                        <Form.Item name="firstName" rules={[{ required: true, message: "Please input firstname!" }]}>
                            <Input placeholder="Firstname" />
                        </Form.Item>
                        <Form.Item name="lastName">
                            <Input placeholder="Lastname" />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                { required: true, message: "Please input phone number!" },
                                { pattern: /^0[0-9]{9}$/, message: "Phone number is not valid" }
                            ]}
                        >
                            <Input placeholder="Phone" />
                        </Form.Item>
                        <Form.Item name="photo" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload
                                action="https://run.mocky.io/v3/932209e6-af4b-43b5-8d72-d30cf92e3027"
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
                </Spin>
            </Modal>
        </ConfigProvider>
    )
}

export default ModalAntd
