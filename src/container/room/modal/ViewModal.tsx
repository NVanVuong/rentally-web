import ModalTitle from "@/components/Modal/ModalTitle"

import { Descriptions, Image } from "antd"
import { IRoom } from "@/interfaces/room.interface"
import { useAppSelector } from "@/redux/hook"



const ViewModal = () => {
    const roomData = useAppSelector((state) => state.modal.data) as IRoom||[] 


    const { id, area, depositAmount,price,roomName,utilities,images } = roomData

    return (
        <div className="flex flex-col items-center">
            <ModalTitle />
            {/* <Image width={120} className="rounded-full" src={photo} /> */}
            <Descriptions column={1} className="mt-28">
                <Descriptions.Item className="text-red-500" label="ID">
                    {id}
                </Descriptions.Item>
                <Descriptions.Item label="Room Name">{roomName}</Descriptions.Item>
                <Descriptions.Item label="Area">{area}</Descriptions.Item>
                <Descriptions.Item label="Price">{price}</Descriptions.Item>
                <Descriptions.Item label="Deposit Amount">{depositAmount}</Descriptions.Item>
                {/* <Descriptions.Item label="Phone Number">{phoneNumber}</Descriptions.Item> */}
            </Descriptions> 
        </div>
    )
}

export default ViewModal
