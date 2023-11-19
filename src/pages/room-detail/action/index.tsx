import { PiShareFat } from "react-icons/pi"
import Button from "../components/Button"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { IUser } from "@/interfaces/user.interface"
import { useCreateChecklistMutation } from "@/redux/services/checklist/checklist.service"
import { useNavigate } from "react-router-dom"
import { IRoomDetail } from "@/interfaces/room-detail.interface"
import { AiFillHeart } from "react-icons/ai"
import { useState } from "react"
import { MODAL } from "@/utils/constants/GlobalConst"
import ModalShare from "./modal"

interface RoomActionProps {
    dataRoom: IRoomDetail
    onClick?: () => void
}

const RoomAction: React.FC<RoomActionProps> = ({ dataRoom }) => {
    const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser
    const [hasFavorited, setHasFavorited] = useState(dataRoom.isInCheckList)

    const [createChecklist] = useCreateChecklistMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleOnClickLike = async () => {
        if (userInfo) {
            await createChecklist({
                data: {
                    roomId: dataRoom.id
                }
            })
            setHasFavorited((state: any) => !state)
        } else {
            navigate("/login")
        }
    }

    return (
        <div className="flex items-center gap-4">
            <ModalShare dataRoom={dataRoom} />
            <Button onClick={() => dispatch(openModal({ type: MODAL.SHARE.ROOM_DETAIL }))} className="hover:underline">
                <PiShareFat /> Share
            </Button>
            <Button className="hover:underline" onClick={handleOnClickLike}>
                <AiFillHeart className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"} /> Like
            </Button>
        </div>
    )
}
export default RoomAction
