import useServerMessage from "@/hooks/useServerMessage"
import { IModal } from "@/interfaces/modal.interface"
import { useDeleteRoomBlockMutation } from "@/redux/services/block/block.service"
import { Button, Spin } from "antd"

const ModalDelete = (props: IModal) => {
    const { data: blockData } = props
    const { id, address } = blockData || {}

    const [deleteRoomBlock, { data, error, isLoading }] = useDeleteRoomBlockMutation()

    useServerMessage({ data: data!, error: error })

    const onDelete = async () => {
        await deleteRoomBlock(id)
    }

    return (
        <Spin spinning={isLoading} className="flex flex-col items-center">
            <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">Delete Room Block</div>

            <p className=" mb-6 text-center font-medium">
                Are you sure you want to delete the room block {id} <br />
                at {address}?
            </p>
            <div className="flex w-full justify-end">
                <Button onClick={onDelete} loading={isLoading} className={`border-none bg-red-500  text-white`}>
                    Delete{" "}
                </Button>
            </div>
        </Spin>
    )
}

export default ModalDelete
