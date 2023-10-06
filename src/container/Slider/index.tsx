import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import "./style.css"
import { useState } from "react"
import ArrowCircle from "./ArrowCircle"

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
        getItem(`${isExpanding ? "Logo" : ""}`, "", <MailOutlined className="ml-0.5" />),

        { type: "divider" },

        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub1.1", <MailOutlined className="ml-0.5" />),
        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub1.2", <MailOutlined className="ml-0.5" />),
        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub1.3", <MailOutlined className="ml-0.5" />),
        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub1.4", <MailOutlined className="ml-0.5" />),

        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub2", <AppstoreOutlined className="ml-0.5" />),

        { type: "divider" },

        getItem(`${isExpanding ? "Navigation One" : ""}`, "sub4", <SettingOutlined className="ml-0.5" />, [
            getItem(`${isExpanding ? "Navigation One" : ""}`, "9"),
            getItem(`${isExpanding ? "Navigation One" : ""}`, "10"),
            getItem(`${isExpanding ? "Navigation One" : ""}`, "11"),
            getItem(`${isExpanding ? "Navigation One" : ""}`, "12")
        ]),

        getItem("xx", "grp", null, [getItem("xx", "13"), getItem("xx", "14")], "group")
    ]

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e)
    }

    return (
        <div
            className={`${
                isExpanding ? "w-60" : "w-20"
            } trasition relative h-screen rounded-br-3xl rounded-tr-3xl border-2 border-gray-300 bg-white duration-200`}
        >
            <div className="h-16"></div>

            <Menu
                onClick={onClick}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
                className={`w-full rounded-br-3xl rounded-tr-3xl`}
            />

            <ArrowCircle isExpanding={isExpanding} onClick={() => setIsExpanding(!isExpanding)} />
        </div>
    )
}

export default Slider
