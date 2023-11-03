import ModalTitle from "@/components/Modal/ModalTitle"
import useServerMessage from "@/hooks/useServerMessage"
import { IRoom } from "@/interfaces/room.interface"
import { useAppSelector } from "@/redux/hook"
import { useDeleteModRoomMutation } from "@/redux/services/room/modRoom.service"
import { Button, Spin } from "antd"

const DeleteModal = () => {
    const roomData = useAppSelector((state) => state.modal.data) as IRoom

    const [deleteModRoom, { data, error, isLoading }] = useDeleteModRoomMutation()

    useServerMessage({ data: data!, error: error })

    const handleClick = async () => {
        await deleteModRoom({ id: roomData?.id })
    }

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <ModalTitle />
            <p className=" mb-6 text-center font-medium">
                Are you sure you want to delete the room <br />
                <span className=" font-bold">{roomData?.roomName}</span>?
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={handleClick} loading={isLoading} className={`border-none bg-red-500 text-white`}>
                    Delete
                </Button>
            </div>
        </Spin>
    )
}

export default DeleteModal
