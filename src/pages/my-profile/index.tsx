import { Button, Form, Input, Upload, UploadProps } from "antd"
import useAuth from "@/hooks/useAuth"
import { AiOutlineUpload } from "react-icons/ai"
import { createMyInfoFormData, normFile } from "@/utils/helpers"
import Footer from "@/container/Footer"
import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload"
import { useState } from "react"
import { useUpdateMyInfoMutation } from "@/redux/services/myProfile/my-profile.service"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import useServerMessage from "@/hooks/useServerMessage"
import { RiLockPasswordLine } from "react-icons/ri"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalUpdatePassword from "./modal"

const MyProfile = () => {
    const dispatch = useAppDispatch()
    const { userInfo } = useAuth()
    const [imageUrl, setImageUrl] = useState<string>()
    const [updateInfo, { data, error, isLoading }] = useUpdateMyInfoMutation()

    const onFinish = async (values: any) => {
        const body = createMyInfoFormData(values)

        const result = await updateInfo(body)

        if ("data" in result) {
            const { data } = result
            if (data?.token) {
                dispatch(setCredentials({ accessToken: data?.token.token }))
            }
        }
    }
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader()
        reader.addEventListener("load", () => callback(reader.result as string))
        reader.readAsDataURL(img)
    }
    const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === "uploading") {
            return
        }
        if (info.file.status === "done") {
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setImageUrl(url)
            })
        }
    }
    useServerMessage({ data: data!, error: error })

    return (
        <>
            <section className="pb-16 pt-16">
                <div className="mx-auto w-full px-4 lg:w-4/12">
                    <div className="mr-2 mt-2 flex justify-end">
                        <Button
                            icon={<RiLockPasswordLine className=" h-5 w-5" />}
                            onClick={() => dispatch(openModal({ type: MODAL.UPDATE.PASSWORD }))}
                        ></Button>
                    </div>
                    <div className="relative mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="flex w-full justify-center px-4">
                                    <div className="relative">
                                        {imageUrl ? (
                                            <img
                                                id="avata-img"
                                                alt="..."
                                                src={imageUrl}
                                                className="-m-16 -ml-20 h-[150px] max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                                            />
                                        ) : (
                                            <img
                                                id="avata-img"
                                                alt="..."
                                                src={userInfo?.photo}
                                                className="-m-16 -ml-20 h-[150px] max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-14 w-full px-4 text-center">
                                    <div className="mt-6 text-center">
                                        <h3 className="mb-2 text-xl font-semibold leading-normal text-gray-700">
                                            {userInfo?.firstName} {userInfo?.lastName}
                                        </h3>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                                                5
                                            </span>
                                            <span className="text-sm text-gray-400">Blocks</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                                                30
                                            </span>
                                            <span className="text-sm text-gray-400">Rooms</span>
                                        </div>
                                        <div className="p-3 text-center">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-gray-600">
                                                120
                                            </span>
                                            <span className="text-sm text-gray-400">Ratings</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-0 border-t border-gray-200 py-2">
                                <h3 className="mb-3 text-xl font-semibold leading-normal text-gray-700">
                                    My Infomation
                                </h3>
                                <div className="flex flex-wrap justify-center">
                                    <Form
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        className="flex w-full flex-col items-center gap-2"
                                        onFinish={onFinish}
                                        initialValues={{
                                            email: userInfo?.email,
                                            firstName: userInfo?.firstName,
                                            lastName: userInfo?.lastName,
                                            phoneNumber: userInfo?.phoneNumber
                                        }}
                                    >
                                        <Form.Item className="w-full" name="email">
                                            <Input className="w-full" placeholder="Email" readOnly />
                                        </Form.Item>

                                        <Form.Item className="w-full" name="firstName">
                                            <Input placeholder="Firstname" />
                                        </Form.Item>
                                        <Form.Item className="w-full" name="lastName">
                                            <Input placeholder="Lastname" />
                                        </Form.Item>
                                        <Form.Item
                                            className="w-full"
                                            name="phoneNumber"
                                            rules={[
                                                {
                                                    pattern: new RegExp(/^[0-9]{10,11}$/),
                                                    message: "Please input phone number with 10 or 11 digits"
                                                }
                                            ]}
                                        >
                                            <Input placeholder="Phone" />
                                        </Form.Item>

                                        <Form.Item
                                            className="w-full"
                                            name="photo"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload
                                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                listType="picture"
                                                onChange={handleChange}
                                                maxCount={1}
                                            >
                                                <Button
                                                    icon={<AiOutlineUpload className="-mr-2 h-5 w-5" />}
                                                    className="flex flex-row-reverse items-center justify-between gap-2"
                                                >
                                                    Upload photo
                                                </Button>
                                            </Upload>
                                        </Form.Item>

                                        <Form.Item className="w-full">
                                            <Button
                                                loading={isLoading}
                                                type="primary"
                                                htmlType="submit"
                                                className="h-10 bg-primary text-white"
                                            >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalUpdatePassword></ModalUpdatePassword>
            <Footer></Footer>
        </>
    )
}

export default MyProfile
