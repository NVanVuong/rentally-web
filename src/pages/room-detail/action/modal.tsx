import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import { IRoomDetail } from "@/interfaces/room-detail.interface"
import { AiFillStar } from "react-icons/ai"
import { useLocation } from "react-router-dom"
import { message } from "antd"
import { BiCopy } from "react-icons/bi"

interface ShareRoomDetailProp {
    dataRoom: IRoomDetail
}

const ModalShare: React.FC<ShareRoomDetailProp> = ({ dataRoom }) => {
    const type = useAppSelector((state) => state.modal.type)
    const location = useLocation()
    const domain = import.meta.env.VITE_DOMAIN

    if (type !== MODAL.SHARE.ROOM_DETAIL) return null

    const handleClick = () => {
        navigator.clipboard.writeText(`${domain} ${location.pathname}`)
        message.success("Link copied to clipboard")
    }

    return (
        <ModalAntd>
            <h2 className="w-full border-b pb-2 text-[18px] font-bold">Share this room</h2>
            <div>
                <div className={"mt-4 flex items-center gap-2 text-sm"}>
                    <img className="h-14 w-14 rounded-md" src={dataRoom.images[0]}></img>
                    <div className="flex flex-col gap-1.5">
                        <address className="font-bold not-italic">{dataRoom.roomblock.address}</address>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 font-bold">
                                <AiFillStar /> {dataRoom.ratingDetail.avgRate}
                            </span>
                            <span className="text-xs">•</span>
                            <span>{dataRoom.ratingDetail.ratings.length} reviews</span>
                            <span className="text-xs">•</span>
                            <span>{dataRoom.price} VND /month</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="flex items-center gap-2 rounded-md border border-gray-300 p-2 hover:border-primary"
                        onClick={handleClick}
                    >
                        <BiCopy /> Copy Link
                    </button>
                </div>
            </div>
        </ModalAntd>
    )
}

export default ModalShare
