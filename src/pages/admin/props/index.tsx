import ModalProps from "@/container/room/modal"
import { Outlet } from "react-router-dom"

const Props = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalProps />
            <Outlet />
        </div>
    )
}

export default Props
