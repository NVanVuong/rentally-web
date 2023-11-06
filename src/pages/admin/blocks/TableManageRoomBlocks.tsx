import { IRoomBlock } from "@/interfaces/block.interface"
import { useGetRoomBlocksQuery } from "@/redux/services/block/block.service"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import { useMenuActions } from "./hooks/useMenuActions"
import { useAppSelector } from "@/redux/hook"

const TableManageRoomBlocks = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetRoomBlocksQuery({ keyword: keyword })
    const roomBlocks = data?.data.roomBlocks as IRoomBlock[]

    const getMenuActions = useMenuActions()

    if (!roomBlocks) return null

    const columns: ColumnsType<IRoomBlock> = [
        {
            title: <span className=" font-bold">ID</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "8%",
            render: (id: string) => <span className=" text-sm font-semibold">#{id}</span>
        },
        {
            title: <span className="font-bold">Landlord</span>,
            key: "name",
            width: "18%",
            sorter: (a, b) => a.landlord.name?.localeCompare(b.landlord.name),
            render: (record: IRoomBlock) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record.landlord.photo} alt={record.landlord.name} />
                    <span className="ml-2 text-sm font-semibold">{record.landlord.name}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Address</span>,
            key: "address",
            dataIndex: "address",
            width: "12%",
            render: (address: string) => <span className="text-sm font-medium">{address}</span>
        },
        {
            title: <span className="font-bold">Quantity Room</span>,
            key: "quantityRooms",
            dataIndex: "quantityRooms",
            width: "10%",
            align: "center" as AlignType,
            render: (quantityRooms: number) => <span className="text-sm font-medium">{quantityRooms}</span>
        },
        {
            title: <span className="font-bold">Empty Room</span>,
            key: "emptyRooms",
            dataIndex: "emptyRooms",
            width: "10%",
            align: "center" as AlignType,
            render: (emptyRooms: number) => <span className="text-sm font-medium">{emptyRooms}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IRoomBlock) => {
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

    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={roomBlocks} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageRoomBlocks