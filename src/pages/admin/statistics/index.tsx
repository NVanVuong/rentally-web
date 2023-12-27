import PageHeader from "@/container/PageHeader"
import Revenue from "./revenue"
import RoomRank from "./room-rank"
import Rentals from "./rentals"
import Rooms from "./rooms"
import Overview from "./overview"

const Statistics = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Statistics Management" />
            <Revenue />
            <div className="mt-8 flex w-full gap-6">
                <RoomRank />
                <div className="flex w-full flex-1 flex-col gap-4">
                    <Rentals />
                    <div className="mt-12 flex gap-6">
                        <Rooms />
                        <Overview />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistics
