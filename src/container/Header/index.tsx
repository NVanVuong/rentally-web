import React, { useState, useRef, useEffect } from "react"
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


const Header = () => {
    const dispatch = useAppDispatch()
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const role = useAppSelector((state) => state.auth.userInfo?.role)
    const headerRef = useRef<HTMLDivElement>(null)

    const handleHeaderClick = () => {
        setIsSearchVisible((prev) => !prev)
    }

    const handleOutsideClick = () => {
        setIsSearchVisible(false)
    }

    //   useClickOutside(headerRef, handleOutsideClick);

    return (
        <div className="sticky inset-0 top-0 z-[999] w-full" ref={headerRef}>
            <div
                className={`flex ${
                    isSearchVisible ? "h-32" : "h-16"
                } relative items-center justify-between border-b border-gray-100 bg-white px-36 py-3 shadow-sm transition-all duration-300 ease-in-out`}
            >
                <div className="h-16 py-3">
                    <Logo />
                </div>
                <div
                    className={`my-6 flex grow items-center justify-center gap-4 ${
                        isSearchVisible ? "block opacity-100" : "hidden opacity-0"
                    } duration-2000 transition-all ease-in-out`}
                >
                    <SearchRoom />
                    <div
                        className="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-[#717171] p-3 px-4"
                        onClick={() => dispatch(openModal({}))}
                    >
                        <VscSettings size={24} />
                        <p className="font-medium">Filters</p>
                    </div>
                    <Filters />
                </div>
                <div className={`flex h-full grow justify-center ${isSearchVisible ? "hidden" : "block"}`}>
                    <div className="flex w-fit items-center justify-center gap-4 rounded-3xl border border-gray-100 pl-4 pr-2 text-sm font-bold shadow-md"  onClick={handleHeaderClick}>
                        <button className="border-r border-gray-100 pr-4">City</button>
                        <button className="border-r border-gray-100 pr-4">District</button>
                        <button
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
                           
                        >
                            <AiOutlineSearch className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                {role === ROLE.USER && <button className="pr-4 text-sm font-bold">Become a host</button>}
                <UserMenu />
                {isSearchVisible && (
                    <div
                        className="duration-2000 fixed left-0 top-0 h-screen w-full  transform bg-black opacity-10 transition z-[-1]"
                        onClick={handleOutsideClick}
                    ></div>
                )}
            </div>
        </div>
    )
}

export default Header
