import TableAntd from "@/components/Table"
import { IUser } from "@/interfaces/user.interface"
import { ROLE, ROLE_COLORS, RoleType, STATUS, STATUS_COLORS, StatusType } from "@/utils/constants/GlobalConst"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space, Spin } from "antd"
import { useGetUsersQuery } from "@/redux/services/user/user.service"
import { useAppSelector } from "@/redux/hook"
import { formatStatus } from "@/utils/helpers"
import { useMenuActions } from "./hooks/useMenuActions"

const TableManageUsers = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetUsersQuery({ keyword: keyword })

    const users = data?.data as IUser[]

    const getMenuActions = useMenuActions()

    const columns: ColumnsType<IUser> = [
        {
            title: <span className=" font-bold">ID</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "8%",
            render: (id: string) => <span className=" text-sm font-semibold">#{id}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "firstName",
            width: "18%",
            sorter: (a, b) => a.firstName?.localeCompare(b.firstName),
            render: (record: IUser) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record.photo} alt={record.firstName} />
                    <span className="ml-2 text-sm font-semibold">{record.firstName}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Email</span>,
            dataIndex: "email",
            key: "email",
            width: "16%",
            sorter: (a, b) => a.email?.localeCompare(b.email),
            render: (email: string) => <span className="text-sm font-medium">{email}</span>
        },
        {
            title: <span className="font-bold">Phone</span>,
            key: "phoneNumber",
            dataIndex: "phoneNumber",
            width: "15%",
            sorter: (a, b) => a.phoneNumber?.localeCompare(b.phoneNumber),
            render: (phoneNumber: string) => <span className="text-sm font-medium">{phoneNumber}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            dataIndex: "status",
            width: "8%",
            filters: [
                { text: "Active", value: STATUS.ACTIVE },
                { text: "Disable", value: STATUS.DISABLED },
                { text: "Registing", value: STATUS.REGISTING }
            ],
            onFilter: (value, record) => record.status === value,
            render: (status: StatusType) => (
                <Badge
                    color={STATUS_COLORS[status]}
                    className="flex items-center text-xs font-medium"
                    text={formatStatus(status)}
                ></Badge>
            )
        },
        {
            title: <span className="font-bold">Role</span>,
            key: "role",
            width: "8%",
            dataIndex: "role",
            filters: [
                { text: "Admin", value: ROLE.ADMIN },
                { text: "Mod", value: ROLE.MOD },
                { text: "User", value: ROLE.USER }
            ],
            onFilter: (value, record) => record.role === value,
            render: (role: string) => (
                <span
                    style={{ backgroundColor: ROLE_COLORS[role as RoleType] }}
                    className={`rounded-2xl px-2 py-1.5 text-center text-xs font-semibold text-white`}
                >
                    {role}
                </span>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
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
            <TableAntd dataSource={users} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageUsers
