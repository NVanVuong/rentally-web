import { RoomCard } from "@/components"
import PageHeader from "@/container/PageHeader"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import { FaPlus } from "react-icons/fa6"

const GenerateRooms = () => {
    const dispatch = useAppDispatch()
    return (
        <div className="">
            <PageHeader title="Room Management - Block Nguyen Van Linh" />
            <div className="mb-4 flex justify-between">
                <button
                    onClick={() => dispatch(openModal({ type: MODAL.ADD }))}
                    className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
                >
                    <FaPlus className="h-3 w-3" />
                    <span className="text-xs font-bold tracking-wide">Submit</span>
                </button>
            </div>
            <div className="my-12 flex w-full flex-col md:grid grid_product max-sm:justify-between justify-center gap-16">
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
            </div>
        </div>
    )
}

export default GenerateRooms
