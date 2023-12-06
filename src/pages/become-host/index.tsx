import { Button, Form, Input } from "antd"
import { useAppDispatch } from "@/redux/hook"
import useServerMessage from "@/hooks/useServerMessage"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input"
import en from "world_countries_lists/data/countries/en/world.json"
import { useBecomeHostMutation } from "@/redux/services/becomeHost/become-host.service"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"

const BecomeHost = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [becomeHost, { data, error, isLoading }] = useBecomeHostMutation()

    const onFinish = async (values: any) => {
        const body = {
            bankCode: values.bankCode.trim(),
            accountNumber: values.accountNumber.trim(),
            phoneNumber: "+" + values.phoneNumber.code + values.phoneNumber.phone.trim().replace(/^0+/, "")
        }
        const result = await becomeHost(body)
        if ("data" in result) {
            const { data } = result
            if (data?.token) {
                dispatch(setCredentials({ accessToken: data?.token.token }))
                navigate(`${SITE_MAP.MOD}/blocks`)
            }
        }
    }

    useServerMessage({ data: data!, error: error })

    return (
        <>
            <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
                <div className="grid grid-cols-2">
                    <div>
                        <strong className="mb-4 text-4xl font-bold text-secondary">Become a host in Rentally</strong>
                        <p className="mb-10 mt-2">
                            Becoming a host on a platform offers several advantages, providing individuals with the
                            tools and features to effectively manage their accommodations.
                        </p>
                        <div className="mb-4">
                            <p className="text-gray-700 text-opacity-80">STEP 1</p>
                            <p className="text-xl">Start with basic infomation</p>
                            <p className="text-gray-700 text-opacity-80">
                                Your phone number, bank account, bank code,...
                            </p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 text-opacity-80">STEP 2</p>
                            <p className="text-xl">Set the scene</p>
                            <p className="text-gray-700 text-opacity-80">Photos, desciption, utility, title,...</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 text-opacity-80">STEP 3</p>
                            <p className="text-xl">Get ready for renters</p>
                            <p className="text-gray-700 text-opacity-80">
                                Price, Calendar, rental, monthly payment,...
                            </p>
                        </div>
                        <div className="mt-16">
                            <strong className="mb-4 text-4xl font-bold text-secondary">What's you got?</strong>
                            <ol className="mt-2 max-w-md list-inside list-decimal space-y-1">
                                <li>
                                    <span className="mb-4 mt-2">Effortless Room Management</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Room Block Management</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Monthly Payment Tracking</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Transaction Monitoring</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Guest Communication and Feedback</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Automated Booking and Reservation System</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Safety and Trust</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Marketing and Exposure</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Host Support and Resources</span>
                                </li>
                                <li>
                                    <span className="mb-4 mt-2">Flexibility and Control</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <img
                            src="https://img.freepik.com/free-photo/group-women-friends-cafe-are-looking-laptop_1153-7265.jpg?w=1060&t=st=1701703227~exp=1701703827~hmac=c598438f931e897ebd1192a14b042ad2e390741ea1d722f7c0341239890c2079"
                            alt=""
                            className=""
                        />
                        <div className="mt-8">
                            <strong className="mb-4 text-4xl font-bold text-secondary">Start now!</strong>
                            <ConfigProvider locale={en}>
                                <Form
                                    onFinish={onFinish}
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    className="mt-4 flex w-full flex-col items-center gap-2"
                                >
                                    <Form.Item
                                        className="w-full"
                                        name="bankCode"
                                        rules={[{ required: true, message: "Please input bank code!" }]}
                                    >
                                        <Input placeholder="Bank Code" />
                                    </Form.Item>
                                    <Form.Item
                                        className="w-full"
                                        name="accountNumber"
                                        rules={[{ required: true, message: "Please input account number!" }]}
                                    >
                                        <Input placeholder="Account Number" />
                                    </Form.Item>
                                    <Form.Item
                                        className="w-full"
                                        name="phoneNumber"
                                        initialValue={{
                                            short: "vn"
                                        }}
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input phone number"
                                                // pattern: new RegExp(/^[0-9]+$/)
                                            }
                                        ]}
                                    >
                                        <CountryPhoneInput />
                                    </Form.Item>

                                    <Form.Item className="w-full">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="mt-10 h-10 bg-primary text-white"
                                            loading={isLoading}
                                        >
                                            Save
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BecomeHost
