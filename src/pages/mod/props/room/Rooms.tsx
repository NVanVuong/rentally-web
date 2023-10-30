import { useGetModRoomsInBlocksQuery } from "@/redux/services/roomBlock/roomBlock.service"
import TableAntd from "@/components/Table"
import { IUser } from "@/interfaces/user.interface"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space, Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "@/hooks/useMenuActions"
import { IRoom } from "@/interfaces/room.interface"
const RoomsManagement = () => {
    const {data, isLoading} = useGetModRoomsInBlocksQuery('34')
    const rooms = data?.data?.roomBlocks
    const keyword = useAppSelector((state) => state.search.keyword)
    console.log(rooms)
    const getMenuActions = useMenuActions()

    const columns: ColumnsType<IRoom> = [
        {
            title: <span className=" font-bold">ID</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "20%",
            render: (id: string) => <span className=" text-sm font-semibold">#{id}</span>
        },
        {
            title: <span className="font-bold">Room_ID</span>,
            key: "roomName",
            width: "15%",
            render: (record: IRoom) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record.images[0]} alt={record.roomName} />
                    <span className="ml-2 text-sm font-semibold">{record.roomName}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Area</span>,
            dataIndex: "area",
            key: "area",
            width: "15%",
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => a.area - b.area,
            render: (area: number) => <span className="text-sm font-medium">{area}</span>
        },        
        {
            title: <span className="font-bold">Price</span>,
            key: "price",
            dataIndex: "price",
            width: "15%",
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => <span className="text-sm font-medium">{price}</span>
        },
        {
            title: <span className="font-bold">Deposit qmount</span>,
            key: "depositAmount",
            dataIndex: "depositAmount",
            width: "15%",
            sortDirections: ['ascend', 'descend'],
            sorter: (a, b) => a.depositAmount - b.depositAmount,
            render: (depositAmount: number) => <span className="text-sm font-medium">{depositAmount}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: IUser) => {
                const menuActions = getMenuActions(record)

                return (
                    <Dropdown menu={{ items: menuActions }} trigger={["click"]} placement="bottomRight" arrow>
                        <Space>
                            <FaEllipsis className="cursor-pointer text-center text-lg" />
                        </Space>
                    </Dropdown>
                )
            }
        }
    ]

    if (!data) return

    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={rooms} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default RoomsManagement
