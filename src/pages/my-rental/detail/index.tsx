import { Badge, Button, Form, Input, Spin } from "antd"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import Rule from "./rule"
import Contract from "./contract"
import {
    useConfirmRentalMutation,
    useGetMyRentalQuery,
    useRequestBreakRentalMutation
} from "@/redux/services/rentals/rentals.service"
import { useEffect } from "react"
import { RENTAL_COLORS, STATUS_RENTAL, STATUS_RENTAL_TEXT } from "@/utils/constants/GlobalConst"
import useServerMessage from "@/hooks/useServerMessage"

export const dateFormat = "DD/MM/YYYY"
export const message = "Please input this field!"

const MyRentalDetail = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const { data, isLoading } = useGetMyRentalQuery({ id: Number(id) })
    const [confirmRental, { isLoading: isConfirmLoading }] = useConfirmRentalMutation()
    const [requestBreakRental, { data: dataRequestBreak, error: errorRequestBreak, isLoading: isRequestBreakLoading }] =
        useRequestBreakRentalMutation()

    useServerMessage({ data: dataRequestBreak!, error: errorRequestBreak })

    const myRental = data?.data
    const status = myRental?.status

    useEffect(() => {
        if (myRental) {
            form.setFieldsValue({
                moveInDate: myRental?.rentalInfo.moveInDate,
                leaseTerm: myRental?.rentalInfo.leaseTerm,
                numberOfTenants: myRental?.rentalInfo.numberOfTenants,
                monthlyRent: myRental?.roomInfo.price,
                leaseTerminationCost: myRental?.rentalInfo.leaseTerminationCost,
                depositAmount: myRental?.roomInfo.depositAmount,
                waterPrice: myRental?.rentalInfo.waterPrice,
                electricPrice: myRental?.rentalInfo.electricPrice,
                additionalPrice: myRental?.rentalInfo.additionalPrice,
                firstName: myRental?.hostInfo.firstName,
                lastName: myRental?.hostInfo.lastName,
                phone: myRental?.hostInfo.phone,
                email: myRental?.hostInfo.email,
                identityDateOfIssue: myRental?.hostInfo.identityDateOfIssue,
                identityNumber: myRental?.hostInfo.identityNumber,
                identityPlaceOfIssue: myRental?.hostInfo.identityPlaceOfIssue,
                birthday: myRental?.hostInfo.birthday
            })
        }
    }, [data, form, myRental])

    const isApprove = status === STATUS_RENTAL.APPROVED
    const isComplete = status === STATUS_RENTAL.COMPLETED

    const onFinish = async () => {
        if (isApprove) {
            const res = await confirmRental({ id: Number(id) })

            if ("data" in res && res.data) {
                window.open(res.data.data.toString(), "_blank")
            }
            return
        }
        if (isComplete) {
            await requestBreakRental({ id: Number(id) })
        }
    }

    return (
        <div className="mb-16 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <div className="flex flex-row items-center">
                <span onClick={() => navigate(-1)}>
                    <MdOutlineArrowBackIosNew className="-ml-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-2 text-black transition duration-100 hover:scale-110 hover:bg-gray-100" />
                </span>
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-xl font-bold">My rentals</h1>
                    {isComplete && (
                        <Button className="h-full w-fit rounded-lg bg-primary px-5 py-1.5 text-sm font-bold text-white hover:shadow-md hover:shadow-primary/60">
                            Export to PDF
                        </Button>
                    )}
                </div>
            </div>
            <Rule />
            <Spin spinning={isLoading}>
                <div className="mt-4 flex gap-20">
                    <div className="grow">
                        <Badge.Ribbon
                            text={STATUS_RENTAL_TEXT[status as STATUS_RENTAL]}
                            color={RENTAL_COLORS[status as STATUS_RENTAL]}
                        >
                            <Form form={form} onFinish={onFinish} layout="vertical" colon={false}>
                                <div>
                                    <h2 className="text-lg font-bold">Rental Information</h2>
                                    <div className="mx-2 mt-2 flex gap-12">
                                        <div className="flex w-full flex-col">
                                            <Form.Item label="Move in date" name="moveInDate" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Lease term" name="leaseTerm" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Number of tenants"
                                                name="numberOfTenants"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>

                                            <Form.Item label="Water price" name="waterPrice" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Electric price" name="electricPrice" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <Form.Item label="Monthly rent" name="monthlyRent" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Lease termination cost"
                                                name="leaseTerminationCost"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Deposit amount" name="depositAmount" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Additional price"
                                                name="additionalPrice"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4 border-b border-gray-200" />
                                <div>
                                    <h2 className="text-lg font-bold">Host Information</h2>
                                    <div className="mx-2 mt-2 flex gap-12">
                                        <div className="flex w-full flex-col">
                                            <Form.Item label="Firstname" name="firstName" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Lastname" name="lastName" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Email" name="email" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item label="Phone" name="phone" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <Form.Item label="Birthday" name="birthday" className="text-sm">
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Identity number"
                                                name="identityNumber"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Identity date of issue"
                                                name="identityDateOfIssue"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                            <Form.Item
                                                label="Identity place of issue"
                                                name="identityPlaceOfIssue"
                                                className="text-sm"
                                            >
                                                <Input readOnly />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                                {isApprove ||
                                    (isComplete && (
                                        <div className="mt-8 flex w-full justify-center">
                                            <Button
                                                loading={isConfirmLoading || isRequestBreakLoading}
                                                type="primary"
                                                htmlType="submit"
                                                className="h-full w-full rounded-lg bg-primary px-10 py-2 font-bold text-white hover:shadow-md hover:shadow-primary/60"
                                            >
                                                {isApprove ? "Confirm" : "Request break"}
                                            </Button>
                                        </div>
                                    ))}
                            </Form>
                        </Badge.Ribbon>
                    </div>
                    <Contract hostInfo={myRental?.hostInfo} roomInfo={myRental?.roomInfo} />
                </div>
            </Spin>
        </div>
    )
}

export default MyRentalDetail
