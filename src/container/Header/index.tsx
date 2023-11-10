import Filters from "@/components/Input/Filters"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { VscSettings } from "react-icons/vsc"
import SearchRoom from "@/components/Input/SearchRoom"
const Header = () => {
    const dispacth = useAppDispatch()

    return (
        <>
            <div className="my-6 flex items-center justify-center gap-4">
                <SearchRoom />
                <div
                    className="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-[#717171] p-3 px-4"
                    onClick={() => dispacth(openModal({}))}
                >
                    <VscSettings size={24} />
                    <p className="font-medium">Filters</p>
                </div>
                <Filters />
            </div>
        </>
    )
}

export default Header
