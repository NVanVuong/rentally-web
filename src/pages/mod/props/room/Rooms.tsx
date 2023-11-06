import { useGetRoomsInBlocksQuery } from "@/redux/services/room/room.service"
import { Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import PageHeader from "@/container/PageHeader"
import TableToolbar from "@/container/Toolbar"
import TableManageRooms from "@/container/room/viewRooms/TableManageRooms"
import { PAGE } from "@/utils/constants/GlobalConst"

const RoomsManagement = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetRoomsInBlocksQuery({ role, id: "34", keyword })
    const rooms = data?.data?.roomBlocks || []
    if (!data) return
    return (
        <Spin spinning={isLoading}>
            <PageHeader title="Rooms Management" />
            <TableToolbar type={PAGE.ROOM} />
            <TableManageRooms rooms={rooms} />
        </Spin>
    )
}

export default RoomsManagement
