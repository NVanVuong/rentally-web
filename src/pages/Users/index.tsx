import TableManageUsers from "./TableManageUsers"
import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalAntd from "@/components/Modal"
import Slider from "@/container/Slider"

const Users = () => {
    return (
        <div className="flex">
            <ModalAntd />
            <Slider />
            {/* <div className="flex-1 px-6 py-4">
                <PageHeader title="Users Management" />
                <TableToolbar />
                <TableManageUsers />
            </div> */}
        </div>
    )
}

export default Users
