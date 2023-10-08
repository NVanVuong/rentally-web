import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import "./style.css"
import { useState } from "react"
import ArrowCircle from "./ArrowCircle"
import RetallyLogo from "../../assets/images/rentally_logo.png"
import RetallyLogoFull from "../../assets/images/rentally_logo_full.png"
import { useNavigate } from "react-router-dom"
import { SITE_MAP } from "@/utils/constants/Path"
import { FaRegUser } from "react-icons/fa"
import { BiHomeAlt } from "react-icons/bi"
import { GrUserSettings } from "react-icons/gr"

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
    const [isExpanding, setIsExpanding] = useState(false)

    const items: MenuProps["items"] = [
        { type: "divider" },

        getItem(`${isExpanding ? "Accounts" : ""}`, "users", <FaRegUser className="h-5 w-5" />),
        getItem(`${isExpanding ? "Mods" : ""}`, "mods", <GrUserSettings className="h-5 w-5" />),
        getItem(`${isExpanding ? "Properties" : ""}`, "props", <BiHomeAlt className="h-5 w-5" />),
        getItem(`${isExpanding ? "xx" : ""}`, "sub1.3", <AppstoreOutlined className="ml-0.5" />),
        getItem(`${isExpanding ? "xx" : ""}`, "sub1.4", <AppstoreOutlined className="ml-0.5" />),

        getItem(`${isExpanding ? "xx" : ""}`, "sub2", <AppstoreOutlined className="ml-0.5" />),

        { type: "divider" },

        getItem(`${isExpanding ? "xx" : ""}`, "sub4", <SettingOutlined className="ml-0.5" />, [
            getItem(`${isExpanding ? "xx" : ""}`, "9"),
            getItem(`${isExpanding ? "xx" : ""}`, "10"),
            getItem(`${isExpanding ? "xx" : ""}`, "11"),
            getItem(`${isExpanding ? "xx" : ""}`, "12")
        ])
    ]

    const navigate = useNavigate()

    const onClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "users":
                navigate(SITE_MAP.USERS_MANAGEMENT)
                break
            case "mods":
                navigate(SITE_MAP.MODS_MANAGEMENT)
                break
            case "props":
                navigate(SITE_MAP.PROPS_MANAGEMENT)
                break
            default:
                break
        }
    }

    return (
        <div
            className={`${
                isExpanding ? "w-60" : "w-20"
            } trasition relative flex h-screen flex-col items-center rounded-br-3xl rounded-tr-3xl border-2 border-gray-300 bg-white duration-200`}
        >
            <img
                className={`${isExpanding ? "h-12" : "h-8"} my-4  transition duration-100`}
                src={isExpanding ? RetallyLogoFull : RetallyLogo}
                alt=""
            />

            <Menu
                onClick={onClick}
                defaultSelectedKeys={["users"]}
                mode="inline"
                items={items}
                className={`w-full rounded-br-3xl rounded-tr-3xl`}
            />

            <ArrowCircle isExpanding={isExpanding} onClick={() => setIsExpanding(!isExpanding)} />
        </div>
    )
}

export default Slider
