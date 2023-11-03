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
import { useGetUtilitiesQuery, useUploadImagesMutation } from "@/redux/services/help/help.service"
import { IUtiltity } from "@/interfaces/utility.interface"

import { MODAL } from "@/utils/constants/GlobalConst"
import TypedInputNumber from "antd/es/input-number"
import ModalTitle from "@/components/Modal/ModalTitle"
import {
    useUpdateRoomMutation,
    useUpdateImagesMutation,
    useCreateRoomsMutation
} from "@/redux/services/room/room.service"
import useServerMessage from "@/hooks/useServerMessage"
const Modal = () => {
    const type = useAppSelector((state) => state.modal.type)
    const roomData = useAppSelector((state) => state.modal.data) as IRoom
    const role = useAppSelector((state) => state.auth.userInfo?.role)

    const imageList = roomData?.images as string[]
    const { data } = useGetUtilitiesQuery("")

    const [updateRoomImages] = useUpdateImagesMutation()
    const [updateRoom, updateRoomResult] = useUpdateRoomMutation()
    const [UploadImages] = useUploadImagesMutation()
    const [createRooms, createRoomsResult] = useCreateRoomsMutation()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

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

    const [selectedOptions, setSelectedOptions] = useState<IUtiltity[]>([])
    const [isLoading, setIsloading] = useState<boolean>(false)

    useEffect(() => {
        if (type === MODAL.UPDATE) {
            if (roomData?.utilities && data) {
                const selectedUtilities = roomData.utilities
                    .map((value: string) => data.find((utility) => utility.id === value))
                    .filter((option) => option !== undefined) as IUtiltity[]

                setSelectedOptions(selectedUtilities)
            }
        }
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            utilities: selectedOptions.map((selectedOption: IUtiltity) => selectedOption.id)
        })
    }, [selectedOptions, form])

    useServerMessage({ data: updateRoomResult.data!, error: updateRoomResult.data })
    useServerMessage({ data: createRoomsResult.data!, error: createRoomsResult.data })

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
                            // console.log(blob)
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
            await updateRoom({ role, id: roomData?.id || "", body: values })
            setIsloading(false)
            dispatch(closeModal())
        } else {
            if (role === "MOD") {
                dispatch(closeModal())
                const srcImage = values.images.fileList[0].thumbUrl

                dispatch(saveSrcImage({ srcImage: JSON.stringify(srcImage) }))

                values.images = values.images.fileList.map((file: any) => file.originFileObj)

                const { quantity, ...roomPattern } = values
                dispatch(generateRoom({ roomPattern: roomPattern as IRoom, quantity: quantity }))
                navigate("/mod/props/generate-rooms")
            } else if (role === "ADMIN") {
                setIsloading(true)

                values.images = values.images.fileList.map((file: any) => file.originFileObj)
                const { quantity, ...roomPattern } = values
                const rooms: IRoom[] = []
                roomPattern.id = "0"
                roomPattern.roomName = "F0"
                for (let i = 0; i < quantity; i++) {
                    const room = { ...roomPattern }
                    room.id = `${i}`
                    room.roomName = `F${i}`
                    rooms.push(room)
                }
                for (const [, room] of rooms.entries()) {
                    const formData = new FormData()
                    room.images?.forEach((image) => {
                        formData.append("files", image)
                    })
                    const res = await UploadImages(formData).unwrap()
                    if (res.status === "success" && res.data) {
                        room.images = res.data
                    } else {
                        console.log("upload error")
                    }
                }
                console.log(rooms)
                await createRooms({ role, body: { roomBlockId: "34", rooms } })

                setIsloading(false)
                dispatch(closeModal())
            }
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
                    <div className="z-10 w-full">
                        <Autocomplete
                            onChange={handleChange}
                            multiple
                            id=""
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    border: "px solid #d9d9d9",
                                    lineHeight: "0px",
                                    height: "80px",
                                    width: "full",
                                    fontSize: "12px",
                                    zIndex: "10",
                                    "&.Mui-focused fieldset": {
                                        border: "0px solid #fff"
                                    }
                                },
                                "& .MuiOutlinedInput-root ": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: "0px solid #fff"
                                    }
                                }
                            }}
                            options={data || []}
                            getOptionLabel={(option) => option.name}
                            value={selectedOptions}
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
                    </div>

                    <Form.Item
                        className=" absolute top-12  w-full border-none text-opacity-0 "
                        name="utilities"
                        rules={[{ required: true, message: "Please input utilities!" }]}
                    >
                        <Input className="  hidden border-none" />
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
