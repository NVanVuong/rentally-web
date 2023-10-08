import { Button, Form, Input, Select, Spin, Upload, message } from "antd"
import { ROLE } from "@/utils/constants/GlobalConst"
import { AiOutlineUpload } from "react-icons/ai"
import { useCreateUserMutation } from "@/redux/services/user/user.service"
import { createUserFormData, normFile } from "@/utils/helpers"
import useServerMessage from "@/hooks/useServerMessage"
import ModalTitle from "@/components/Modal/ModalTitle"

const ModalAdd = () => {
    const [createUser, { data, error, isLoading }] = useCreateUserMutation()

    useServerMessage({ data: data!, error: error })

    const handleChange = async (info: any) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    const onFinish = async (values: any) => {
        const formData = createUserFormData(values)
        await createUser(formData)
    }

    const handleValuesChange = (changedValues: any, allValues: any) => {
        console.log("Changed Values:", changedValues)
        console.log("All Values:", allValues)
    }

    return (
        <Spin spinning={isLoading}>
            <ModalTitle />
            <Form
                onValuesChange={handleValuesChange}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="flex w-full flex-col items-center"
            >
                <Form.Item
                    className="w-full"
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

                <Form.Item
                    className="w-full"
                    name="password"
                    rules={[{ required: true, message: "Please input password!" }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                    className="w-full"
                    name="firstName"
                    rules={[{ required: true, message: "Please input firstname!" }]}
                >
                    <Input placeholder="Firstname" />
                </Form.Item>
                <Form.Item className="w-full" name="lastName">
                    <Input placeholder="Lastname" />
                </Form.Item>
                <Form.Item
                    className="w-full"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please input phone number!" }]}
                >
                    <Input placeholder="Phone" />
                </Form.Item>

                <Form.Item className="w-full" name="photo" valuePropName="fileList" getValueFromEvent={normFile}>
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

                <Form.Item className="w-full" name="role" rules={[{ required: true }]}>
                    <Select placement="topRight" placeholder="Role">
                        <Select.Option value={ROLE.ADMIN}>Admin</Select.Option>
                        <Select.Option value={ROLE.MOD}>Mod</Select.Option>
                        <Select.Option value={ROLE.USER}>User</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item className="w-full">
                    <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                        Finish
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default ModalAdd
