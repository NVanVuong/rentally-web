import { IRoomBlock } from "@/interfaces/block.interface"
import { useGetRoomBlocksQuery } from "@/redux/services/block/block.service"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import { useMenuActions } from "./useMenuActions"

const TableManageRoomBlocks = () => {
    const { data, isLoading } = useGetRoomBlocksQuery({})

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
            width: "16%",
            render: (record: IRoomBlock) => (
                <>
                    <>{console.log(record)}</>
                    <span className="text-sm font-medium">{record?.city + ", " + record?.country}</span>
                </>
            )
        },
        {
            title: <span className="font-bold">Quantity Room</span>,
            key: "quantityRoom",
            dataIndex: "quantityRoom",
            width: "10%",
            align: "center" as AlignType,
            render: () => <span className="text-sm font-medium">{10}</span>
        },
        {
            title: <span className="font-bold">Empty Room</span>,
            key: "emptyRoom",
            dataIndex: "emptyRoom",
            width: "10%",
            align: "center" as AlignType,
            render: () => <span className="text-sm font-medium">{10}</span>
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
