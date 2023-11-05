import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import { PAGE } from "@/utils/constants/GlobalConst"

const Rooms = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Rooms Management" />
            <TableToolbar type={PAGE.ROOM} />
        </div>
    )
}

export default Rooms
