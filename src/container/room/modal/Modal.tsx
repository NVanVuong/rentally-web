import { Button, Form, Input, Spin } from "antd"
import UploadImage from "@/components/Upload"
import { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { generateRoom, saveSrcImage } from "@/redux/features/generateRoom/generateRoom.slice"
import { IRoom } from "@/interfaces/room.interface"
import { useNavigate } from "react-router-dom"
import { closeModal } from "@/redux/features/modal/modal.slice"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { IUtiltity } from "@/interfaces/utility.interface"

import { MODAL } from "@/utils/constants/GlobalConst"
import TypedInputNumber from "antd/es/input-number"
import ModalTitle from "@/components/Modal/ModalTitle"
import { useUpdateModRoomMutation, useUpdateRoomImagesMutation } from "@/redux/services/room/room.service"
import useServerMessage from "@/hooks/useServerMessage"
const Modal = () => {
    const type = useAppSelector((state) => state.modal.type)
    const roomData = useAppSelector((state) => state.modal.data) as IRoom
    const [updateRoomImages] = useUpdateRoomImagesMutation()
    const [updateRoom, updateRoomResult] = useUpdateModRoomMutation()
    const imageList = roomData?.images as string[]
    let initialValues = {}
    if (type === MODAL.UPDATE) {
        initialValues = {
            id: roomData?.id,
            roomName: roomData?.roomName,
            area: roomData?.area,
            price: roomData?.price,
            depositAmount: roomData?.depositAmount
        }
    }

    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])
    const navigate = useNavigate()
    const { data } = useGetUtilitiesQuery("")

    const [isLoading, setIsloading] = useState<boolean>(false)

    useServerMessage({ data: updateRoomResult.data!, error: updateRoomResult.data })

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

    const onFinish = async (values: any) => {
        if (type === MODAL.UPDATE) {
            setIsloading(true)
            const formData = new FormData()

            for (const value of values.images.fileList) {
                if ("status" in value) {
                    fetch(value.url)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Network response was not ok")
                            }
                            return response.blob()
                        })
                        .then((blob) => {
                            formData.append("files", blob)
                        })
                        .catch((error) => {
                            console.error("There was a problem with the fetch operation:", error)
                        })
                } else {
                    formData.append("files", value.originFileObj)
                }
            }
            const res = await updateRoomImages({ id: roomData?.id || "", body: formData }).unwrap()
            if (res.status === "success" && res.data) {
                values.images = res.data as string[]
            } else {
                console.log("upload error")
            }
            values.area = parseInt(values.area, 10)
            values.price = parseInt(values.price, 10)
            values.depositAmount = parseInt(values.depositAmount, 10)
            await updateRoom({ id: roomData?.id || "", body: values })
            setIsloading(false)
            dispatch(closeModal())
        } else {
            dispatch(closeModal())
            const srcImage = values.images.fileList[0].thumbUrl

            dispatch(saveSrcImage({ srcImage: JSON.stringify(srcImage) }))

            values.images = values.images.fileList.map((file: any) => file.originFileObj)

            const { quantity, ...roomPattern } = values
            dispatch(generateRoom({ roomPattern: roomPattern as IRoom, quantity: quantity }))
            navigate("/mod/props/generate-rooms")
        }
    }

    return (
        <Spin spinning={isLoading}>
            <ModalTitle />
            <Form
                form={form}
                onValuesChange={handleValuesChange}
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                className="flex w-full flex-col items-center"
                initialValues={initialValues}
            >
                {type === MODAL.UPDATE && (
                    <Form.Item
                        className="w-full"
                        name="roomName"
                        rules={[{ required: true, message: "Please input room name!" }]}
                    >
                        <Input className="w-full" placeholder="Room name" />
                    </Form.Item>
                )}
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
                {type === MODAL.ADD ? (
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
                ) : (
                    <Form.Item
                        className="w-full"
                        name="depositAmount"
                        rules={[{ required: true, message: "Please input deposit amount" }]}
                    >
                        <TypedInputNumber className="w-full" placeholder="Deposit amount" />
                    </Form.Item>
                )}

                <div className="relative mb-6 w-full rounded-md border focus-within:border-primary hover:border-primary">
                    <Autocomplete
                        onChange={handleChange}
                        multiple
                        id=""
                        sx={{
                            "& .MuiAutocomplete-popper": { fontSize: "12px" },
                            "& .MuiOutlinedInput-root": {
                                border: "px solid #d9d9d9",
                                lineHeight: "0px",
                                height: "80px",
                                width: "full",
                                fontSize: "12px"
                            },
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                border: "0px solid #fff"
                            }
                        }}
                        options={data || []}
                        getOptionLabel={(option) => option.name}
                        defaultValue={roomData?.utilities?.map(
                            (value: string) => data?.find((utility) => utility.id === value)
                        )}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{
                                    "& .MuiButtonBase-root": {
                                        lineHeight: "20px",
                                        fontSize: "12px"
                                    }
                                }}
                                label=""
                                placeholder="New util"
                            />
                        )}
                    />

                    <Form.Item
                        className=" absolute top-0 z-[-100] w-full"
                        name="utilities"
                        rules={[{ required: true, message: "Please input utilities!" }]}
                    >
                        <Input className="hidden " />
                    </Form.Item>
                </div>

                <UploadImage imageList={imageList || []} />
                <Form.Item className="w-full  pt-6">
                    <Button type="primary" htmlType="submit" className="h-10 bg-primary text-white">
                        Finish
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    )
}

export default Modal
