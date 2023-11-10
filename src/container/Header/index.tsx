import Logo from "@/components/Logo"
import UserMenu from "../UserMenu"
import { AiOutlineSearch } from "react-icons/ai"
import { useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"

const Header = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role)

    return (
        <div className="fixed inset-0 top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-28 py-3 shadow-sm">
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
