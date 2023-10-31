import { useGetModRoomsInBlocksQuery } from "@/redux/services/room/room.service"
import { Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import PageHeader from "@/container/PageHeader"
import TableToolbar from "@/container/Toolbar"
import TableManageRooms from "@/container/room/viewRooms/TableManageRooms"
const RoomsManagement = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetModRoomsInBlocksQuery({ id: "34", keyword })
    const rooms = data?.data?.roomBlocks
    if (!data) return
    return (
        <Spin spinning={isLoading}>
            <PageHeader title="Rooms Management" />
            <TableToolbar />
            <TableManageRooms rooms={rooms} />
        </Spin>
    )
}

export default RoomsManagement
