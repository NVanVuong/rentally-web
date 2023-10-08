import avatar from "@/assets/images/avatar.png"
import { Avatar, Badge, Dropdown, MenuProps } from "antd"
import { MdOutlineAdminPanelSettings, MdLogout } from "react-icons/md"
import { BiUser } from "react-icons/bi"
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
    return (
        <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="text-2xl font-medium  text-secondary">{props.title}</h1>
            <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft" arrow>
                <Badge size="small" count={1}>
                    <Avatar className="cursor-pointer" src={avatar} size={48} />
                </Badge>
            </Dropdown>
        </div>
    )
}

export default PageHeader
