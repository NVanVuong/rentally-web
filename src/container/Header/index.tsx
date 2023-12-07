import Logo from "@/components/Logo"
import UserMenu from "../UserMenu"
import { AiOutlineSearch } from "react-icons/ai"
import { MODAL } from "@/utils/constants/GlobalConst"
import Filters from "@/components/Input/Filters"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { VscSettings } from "react-icons/vsc"
import SearchRoom from "@/components/Input/SearchRoom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"

const Header = () => {
    const dispacth = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [isSticky, setIsSticky] = useState(false)

    const handleOnClick = (e: any) => {
        e.stopPropagation()
        setIsOpen(true)
    }

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 200)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const location = useLocation()
    const isHome = location.pathname === SITE_MAP.INDEX

    return (
        <div
            onClick={() => setIsOpen(false)}
            className={`${isOpen ? "h-24" : "h-16"} ${isSticky ? "bg-white" : "bg-transparent"} ${
                isHome ? "fixed" : "sticky"
            }
            top-0 z-[999] flex w-full items-center justify-between px-4 py-3 shadow-sm transition-all duration-150 sm:px-6 md:px-10 xl:px-28`}
        >
            <Logo />

            {isHome && (
                <div className="flex h-full grow flex-col items-center justify-center transition-all duration-200">
                    <div className={`BG-W my-1 flex items-center justify-center gap-4 ${isOpen ? "block" : "hidden"}`}>
                        <SearchRoom />
                        <div
                            className={`flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-3 px-4 shadow-md shadow-black/10`}
                            onClick={(e) => {
                                e.stopPropagation()
                                dispacth(openModal({ type: MODAL.FILTER.ROOM_FINDING }))
                            }}
                        >
                            <VscSettings size={24} />
                            <p className="text-sm font-medium">Filters</p>
                        </div>
                        <Filters />
                    </div>

                    <div className={`${isOpen ? "hidden" : "block"} cursor-pointer `}>
                        <div
                            onClick={handleOnClick}
                            className={`flex w-fit items-center justify-center gap-4 rounded-3xl border border-gray-100 bg-white py-1 pl-4 pr-2 text-sm font-bold shadow-md shadow-black/20`}
                        >
                            <span className="border-r border-gray-100 pr-4">City</span>

                            <span className="border-r border-gray-100 pr-4">District</span>

                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                                <AiOutlineSearch className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <UserMenu />
        </div>
    )
}

export default Header
