import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useState } from "react"
import ArrowCircle from "../../assets/icons/ArrowCircle"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import { FaRegUser } from "react-icons/fa"
import { BiHomeAlt, BiStats } from "react-icons/bi"
import Logo from "@/components/Logo"
import { ROLE } from "@/utils/constants/GlobalConst"
import "./style.css"
import { MdLogout, MdOutlinePayment } from "react-icons/md"
import Button from "@/pages/home/room-detail/components/Button"
import { TbHomeCog } from "react-icons/tb"
import { LuClipboardSignature, LuLayoutDashboard } from "react-icons/lu"
import useAuth from "@/hooks/useAuth"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

const Slider = () => {
    const { role } = useAuth()
    const [isExpanding, setIsExpanding] = useState(false)
    const navigate = useNavigate()

    let items: MenuProps["items"] = [
        { type: "divider" },

        getItem(`${isExpanding ? "Accounts" : ""}`, "users", <FaRegUser className="h-5 w-5" />),
        getItem(`${isExpanding ? "Room Blocks" : ""}`, "blocks", <BiHomeAlt className="h-5 w-5" />),
        getItem(`${isExpanding ? "Rentals" : ""}`, "rentals", <LuClipboardSignature className="h-5 w-5" />),
        getItem(`${isExpanding ? "Payments" : ""}`, "payments", <MdOutlinePayment className="h-5 w-5" />),
        getItem(`${isExpanding ? "Utilities" : ""}`, "utilities", <TbHomeCog className="h-5 w-5" />),
        getItem(`${isExpanding ? "Transactions" : ""}`, "transactions", <BiStats className="h-5 w-5" />),
        getItem(`${isExpanding ? "Statistic" : ""}`, "statistic", <LuLayoutDashboard className="h-5 w-5" />),

        { type: "divider" }
    ]

    if (role === ROLE.MOD) {
        items = items.filter((item) => item!.key !== "users")
    }

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "users":
                navigate(SITE_MAP.USERS)
                break
            case "blocks":
                navigate(SITE_MAP.BLOCKS)
                break
            case "utilities":
                navigate(SITE_MAP.UTILITIES)
                break
            case "payments":
                navigate(SITE_MAP.PAYMENTS)
                break
            case "rentals":
                navigate(SITE_MAP.RENTALS)
                break
            case "transactions":
                navigate(SITE_MAP.TRANSACTIONS)
                break
            case "statistic":
                navigate(SITE_MAP.STATISTICS)
                break
            default:
                break
        }
    }

    return (
        <div
            className={`${
                isExpanding ? "w-60" : "w-20"
            } trasition relative flex h-screen flex-col items-center rounded-br-3xl rounded-tr-3xl border border-gray-200 bg-white duration-200 peer-hover:bg-red-500`}
        >
            <div className="h-20 py-4">
                <Logo isOpen={isExpanding} />
            </div>

            <Menu
                onClick={onClick}
                defaultSelectedKeys={role === ROLE.MOD ? ["blocks"] : ["users"]}
                mode="inline"
                items={items}
                style={{ borderInlineEnd: "none" }}
                className={`w-full rounded-br-3xl rounded-tr-3xl border-none`}
            />

            <div className="absolute bottom-4 w-full px-2">
                <Button
                    onClick={() => navigate(SITE_MAP.INDEX)}
                    className="w-full rounded-xl bg-primary py-2.5 text-white shadow-md shadow-primary/60 transition duration-150 hover:shadow-md hover:shadow-primary/90"
                >
                    <MdLogout className="h-5 w-5" /> {isExpanding ? "Logout" : ""}
                </Button>
            </div>

            <ArrowCircle isExpanding={isExpanding} onClick={() => setIsExpanding(!isExpanding)} />
        </div>
    )
}

export default Slider
