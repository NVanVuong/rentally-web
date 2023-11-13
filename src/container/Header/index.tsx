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
import { useState } from "react"

const Header = () => {
    const dispacth = useAppDispatch()
    const role = useAppSelector((state) => state.auth.userInfo?.role)

    const [isOpen, setIsOpen] = useState(false)

    const handleOnClick = (e: any) => {
        e.stopPropagation()
        setIsOpen(true)
    }

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${
                isOpen ? "h-24" : "h-16"
            } sticky inset-0 top-0 z-[999] flex items-center justify-between border-b border-gray-100 bg-white px-36 py-3 shadow-sm transition-all duration-300`}
        >
            <div className={`${isOpen ? "py-4" : ""}`}>
                <Logo />
            </div>

            <div className="flex h-full grow flex-col items-center justify-center transition-all duration-200">
                {isOpen ? (
                    <div className="my-1 flex items-center justify-center gap-4">
                        <SearchRoom />
                        <div
                            className="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-[#717171] p-3 px-4"
                            onClick={(e) => {
                                e.stopPropagation()
                                dispacth(openModal({}))
                            }}
                        >
                            <VscSettings size={24} />
                            <p className="font-medium">Filters</p>
                        </div>
                        <Filters />
                    </div>
                ) : (
                    <div
                        onClick={handleOnClick}
                        className={`flex w-fit items-center justify-center gap-4 rounded-3xl border border-gray-100 py-1 pl-4 pr-2 text-sm font-bold shadow-md`}
                    >
                        <button className="border-r border-gray-100 pr-4">City</button>

                        <button className="border-r border-gray-100 pr-4">District</button>

                        <button className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                            <AiOutlineSearch className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>

            {role === ROLE.USER && <button className="pr-4 text-sm font-bold">Become a host</button>}
            <UserMenu />
        </div>
    )
}

export default Header
