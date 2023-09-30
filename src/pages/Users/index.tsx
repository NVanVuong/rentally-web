import { useGetUsersQuery } from "@/redux/services/user/user.service"
import { useAppSelector } from "@/redux/hook"
import TableManageUsers from "./TableManageUsers"

import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalAntd from "@/components/Modal"

const Users = () => {
    const keyword = useAppSelector((state) => state.search.keyword)

    const { data, isLoading } = useGetUsersQuery({ keyword: keyword || "" })

    if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>

    return (
        <div className="flex">
            <ModalAntd />
            <div className="h-screen w-60 rounded-br-2xl rounded-tr-2xl border-2 border-gray-100"></div>
            <div className="flex-1 px-6 py-4">
                <PageHeader title="Users Management" />
                <TableToolbar />
                <TableManageUsers users={data} />
            </div>
        </div>
    )
}

export default Users
