import ModalProps from "@/container/room/modal"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import { FaPlus } from "react-icons/fa6"
import { openModal } from "@/redux/features/modal/modal.slice"
const Props = () => {
    const dispatch = useAppDispatch()
    return (
        <div className="flex-1 px-6 py-4">
            <ModalProps />
            <div className="mb-4 flex justify-between">
                <button
                    onClick={() => dispatch(openModal({ type: MODAL.ADD }))}
                    className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
                >
                    <FaPlus className="h-3 w-3" />
                    <span className="text-xs font-bold tracking-wide">Add</span>
                </button>
            </div>
            <Outlet />
        </div>
    )
}

export default Props
