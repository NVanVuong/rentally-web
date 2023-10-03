import TableManageUsers from "./TableManageUsers"
import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalAntd from "@/components/Modal"

const Users = () => {
    return (
        <div className="flex">
            <ModalAntd />
            <div className="h-screen w-60 rounded-br-2xl rounded-tr-2xl border-2 border-gray-100"></div>
            <div className="flex-1 px-6 py-4">
                <PageHeader title="Users Management" />
                <TableToolbar />
                <TableManageUsers />
            </div>
        </div>
    )
}

export default Users
