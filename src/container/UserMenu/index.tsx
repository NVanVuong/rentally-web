import { Avatar, Dropdown, MenuProps } from "antd"
import { MdOutlineAdminPanelSettings, MdLogout } from "react-icons/md"
import { BiUser } from "react-icons/bi"
import { logOut } from "@/redux/features/auth/auth.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { MdOutlineMenu } from "react-icons/md"
import { useState } from "react"
import "./style.css"
import { ROLE } from "@/utils/constants/GlobalConst"
import { IUser } from "@/interfaces/user.interface"
import { SITE_MAP } from "@/utils/constants/Path"
import { useNavigate } from "react-router-dom"

const UserMenu = () => {
    const userInfo = useAppSelector((state) => state.auth.userInfo) as IUser
    const role = userInfo?.role

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

    const dispatch = useAppDispatch()
    const onClick: MenuProps["onClick"] = ({ key }) => {
        switch (key) {
            case "propfile":
                break
            case "admin":
                navigate(SITE_MAP.ADMIN)
                break
            case "mod":
                navigate(SITE_MAP.MOD)
                break
            case "logout":
                dispatch(logOut())
                break
            default:
                break
        }
    }

    const items: MenuProps["items"] = [
        {
            key: "propfile",
            label: "My Profile",
            icon: <BiUser className="mr-4 h-4 w-4" />
        },
        role === ROLE.ADMIN
            ? {
                  key: "admin",
                  label: "Admin",
                  icon: <MdOutlineAdminPanelSettings className="mr-4 h-4 w-4" />
              }
            : {
                  key: "mod",
                  label: "Mod",
                  icon: <MdOutlineAdminPanelSettings className="mr-4 h-4 w-4" />
              },
        {
            type: "divider"
        },
        {
            key: "logout",
            label: "Logout",
            icon: <MdLogout className="mr-4 h-4 w-4" />
        }
    ]

    return (
        <Dropdown
            className={`flex items-center justify-center gap-2 rounded-full border border-gray-200 py-1 pl-3 pr-2 transition duration-200 hover:shadow-xl ${
                isOpen ? "shadow-xl" : "shadow-none"
            }`}
            placement="bottomRight"
            menu={{ items, onClick }}
            trigger={["click"]}
            arrow
            onOpenChange={() => setIsOpen(!isOpen)}
        >
            <div>
                <MdOutlineMenu className="h-5 w-5" />
                <Avatar className="cursor-pointer" src={userInfo?.photo} size={36} />
            </div>
        </Dropdown>
    )
}

export default UserMenu
