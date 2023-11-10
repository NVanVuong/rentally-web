import { useGetRoomsInBlocksQuery } from "@/redux/services/room/room.service"
import { Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import PageHeader from "@/container/PageHeader"
import TableToolbar from "@/container/Toolbar"
import TableManageRooms from "@/container/room/viewRooms/TableManageRooms"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalProps from "@/container/room/modal"
import { useParams } from "react-router-dom"

const RoomsManagement = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const keyword = useAppSelector((state) => state.search.keyword)
    const { id } = useParams()
    const { data, isLoading } = useGetRoomsInBlocksQuery({ role, id: id || "", keyword })
    const rooms = data?.data?.roomBlocks || []
    if (!data) return
    return (
        <div className="flex-1 px-6 py-4">
            <Spin spinning={isLoading}>
                <ModalProps />
                <PageHeader title="Rooms Management" />
                <TableToolbar type={PAGE.ROOM} />
                <TableManageRooms rooms={rooms} />
            </Spin>
        </div>
    )
}

export default RoomsManagement