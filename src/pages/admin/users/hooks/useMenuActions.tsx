import { TbEdit } from "react-icons/tb"
import { FiShieldOff } from "react-icons/fi"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL, STATUS } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"
import { IUser } from "@/interfaces/user.interface"

export const useMenuActions = () => {
    const dispatch = useAppDispatch()

    return (record: IUser) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.VIEW.USER, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "0"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() => dispatch(openModal({ type: MODAL.UPDATE.USER, data: record }))}
                        className="flex justify-between font-medium text-yellow-500"
                    >
                        Update <TbEdit className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "1"
            },
            {
                type: "divider"
            },
            {
                label: (
                    <div
                        onClick={() =>
                            dispatch(
                                openModal({
                                    type: MODAL.DISABLE.USER,
                                    data: record
                                })
                            )
                        }
                        className="flex justify-between font-medium text-orange-500"
                    >
                        {record?.status === STATUS.ACTIVE ? "Disable" : "Active"}{" "}
                        <FiShieldOff className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
        ] as MenuProps["items"]
}
