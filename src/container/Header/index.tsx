import Logo from "@/components/Logo"
import UserMenu from "../UserMenu"
import { AiOutlineSearch } from "react-icons/ai"
import { useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"
import Filters from "@/components/Input/Filters"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { VscSettings } from "react-icons/vsc"
import SearchRoom from "@/components/Input/SearchRoom"
import { useLocation } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"

const Header = () => {
    const dispacth = useAppDispatch()
    const role = useAppSelector((state) => state.auth.userInfo?.role)

    const location = useLocation()

    if (location.pathname === SITE_MAP.INDEX) {
        return (
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
        )
    }

    return (
        <div className="fixed inset-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-36 py-3 shadow-sm">
            <Logo />

            <div className="flex h-full grow justify-center">
                <div className="flex w-fit items-center justify-center gap-4 rounded-3xl border border-gray-100 pl-4 pr-2 text-sm font-bold shadow-md">
                    <button className="border-r border-gray-100 pr-4">City</button>

                    <button className="border-r border-gray-100 pr-4">District</button>

                    <button className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                        <AiOutlineSearch className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {role === ROLE.USER && <button className="pr-4 text-sm font-bold">Become a host</button>}
            <UserMenu />
        </div>
    )
}

export default Header
