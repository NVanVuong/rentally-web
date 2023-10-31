import { TbEdit, TbTrashX } from "react-icons/tb"
import { FiShieldOff } from "react-icons/fi"
import { HiOutlineViewfinderCircle } from "react-icons/hi2"
import { useAppDispatch } from "@/redux/hook"
import { openModal } from "@/redux/features/modal/modal.slice"
import { MODAL } from "@/utils/constants/GlobalConst"
import { MenuProps } from "antd"

interface MenuActionsProps {
    isDelete?: boolean
}

export const useMenuActions = ({ isDelete = false }: MenuActionsProps) => {
    const dispacth = useAppDispatch()

    return (record: any) =>
        [
            {
                label: (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.VIEW, data: record }))}
                        className="flex justify-between font-medium text-gray-500"
                    >
                        View <HiOutlineViewfinderCircle className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "0"
            },
            {
                label: (
                    <div
                        onClick={() => {
                            console.log(record)
                            dispacth(openModal({ type: MODAL.UPDATE, data: record }))
                        }}
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
                label: isDelete ? (
                    <div
                        onClick={() => dispacth(openModal({ type: MODAL.DELETE, data: record }))}
                        className="flex justify-between font-medium text-red-500"
                    >
                        Delete <TbTrashX className="ml-2.5 h-5 w-5" />
                    </div>
                ) : (
                    <div
                        onClick={() =>
                            dispacth(
                                openModal({
                                    type: MODAL.DISABLE,
                                    data: record
                                })
                            )
                        }
                        className="flex justify-between font-medium text-orange-500"
                    >
                        Disable <FiShieldOff className="ml-2.5 h-5 w-5" />
                    </div>
                ),
                key: "2"
            }
            // {
            //     type: "divider"
            // },
            // {
            //     label: (
            //         <div
            //             onClick={() => dispacth(openModal({ type: MODAL.DELETE, data: record }))}
            //             className="flex justify-between font-medium text-red-500"
            //         >
            //             Delete <TbTrashX className="ml-2.5 h-5 w-5" />
            //         </div>
            //     ),
            //     key: "3"
            // }
        ] as MenuProps["items"]
}
