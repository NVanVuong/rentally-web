import { RoomCard } from "@/components"
import PageHeader from "@/container/PageHeader"
import { useAppDispatch } from "@/redux/hook"
import { BsSave } from "react-icons/bs"
import { useAppSelector } from "@/redux/hook"
import { addRoom, saveRoom } from "@/redux/features/generateRoom/generateRoom.slice"
import { FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
const GenerateRooms = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const rooms = useAppSelector((state) => state.generateRoom.rooms)

    return (
        <div className="">
            <PageHeader title="Room Management - Block Nguyen Van Linh" />
            <div className="mx-4 mb-4 flex justify-end gap-4">
                <button
                    onClick={() => {dispatch(addRoom())}}
                    className="flex items-center space-x-2 rounded-xl bg-secondary px-3 py-2 text-white"
                >
                    <FaPlus className="h-3 w-3" />
                    <span className="text-xs font-bold tracking-wide">Add</span>
                </button>
                <button
                    onClick={() => {
                        dispatch(saveRoom())
                        navigate("/mod/props")
                    }}
                    className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
                >
                    <BsSave className="h-3 w-3" />
                    <span className="text-xs font-bold tracking-wide">Submit</span>
                </button>
            </div>
            <div className="grid_product my-12 flex w-full flex-col justify-center gap-16 max-sm:justify-between md:grid">
                {rooms?.map((room, index) => <RoomCard key={index} room={room} />)}
            </div>
        </div>
    )
}

export default GenerateRooms
