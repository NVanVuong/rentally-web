import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalUser from "./modal"
import TableManageUsers from "./TableManageUsers"

const Users = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalUser />
            <PageHeader title="Users Management" />
            <TableToolbar />
            <TableManageUsers />
        </div>
    )
}

export default Users
