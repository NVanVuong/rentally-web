import Search from "@/components/Search"
import { openModal } from "@/redux/features/modal/modal.slice"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import { FaPlus } from "react-icons/fa6"

const TableToolbar = () => {
    const dispatch = useAppDispatch()

    return (
        <div className="mb-4 flex justify-between">
            <Search />

            <button
                onClick={() => dispatch(openModal({ type: MODAL.ADD }))}
                className="flex items-center space-x-2 rounded-xl bg-primary px-3 py-2 text-white"
            >
                <FaPlus className="h-3 w-3" />
                <span className="text-xs font-bold tracking-wide">Add Rooms</span>
            </button>
        </div>
    )
}

export default TableToolbar
