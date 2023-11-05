import { Avatar, Dropdown, MenuProps } from "antd"
import { MdOutlineAdminPanelSettings, MdLogout } from "react-icons/md"
import { BiUser } from "react-icons/bi"
import { logOut } from "@/redux/features/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { MdOutlineMenu } from "react-icons/md"
import { useState } from "react"
import "./style.css"

interface IPageHeader {
    title: string
}
const items: MenuProps["items"] = [
    {
        key: "0",
        label: "My Profile",
        icon: <BiUser className="mr-4 h-4 w-4" />
    },
    {
        key: "1",
        label: "Admin",
        icon: <MdOutlineAdminPanelSettings className="mr-4 h-4 w-4" />
    },
    {
        type: "divider"
    },
    {
        key: "2",
        label: "Logout",
        icon: <MdLogout className="mr-4 h-4 w-4" />
    }
]

const PageHeader = (props: IPageHeader) => {
    const userInfo = useAppSelector((state) => state.auth.userInfo)
    const dispatch = useAppDispatch()
    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "0":
                break
            case "1":
                break
            case "2":
                dispatch(logOut())
                break
            default:
                break
        }
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="text-2xl font-medium  text-secondary">{props.title}</h1>
            <Dropdown
                className={`flex items-center justify-center gap-2 rounded-full border border-gray-200 py-1 pl-3 pr-2 transition duration-200 hover:shadow-xl ${
                    isOpen ? "shadow-xl" : "shadow-none"
                }`}
                menu={{ items, onClick }}
                trigger={["click"]}
                placement="bottomLeft"
                arrow
                onOpenChange={() => setIsOpen(!isOpen)}
            >
                <div>
                    <MdOutlineMenu className="h-5 w-5" />
                    <Avatar className="cursor-pointer" src={userInfo?.photo} size={36} />
                </div>
            </Dropdown>
        </div>
    )
}

export default PageHeader
