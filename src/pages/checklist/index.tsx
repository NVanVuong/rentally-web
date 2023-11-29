import { useState } from "react"
import ListingCard from "@/components/Card/ListingCard"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { Empty, Skeleton } from "antd"
import { useGetChecklistQuery } from "@/redux/services/checklist/checklist.service"

const Checklist = () => {
    const [isShowMap, setIsShowMap] = useState(false)

    const { data, isLoading } = useGetChecklistQuery()

    if (isLoading) {
        return (
            <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-28">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div style={{ width: "100%" }} key={index}>
                            <Skeleton.Image className="!aspect-square !h-auto !w-full" active />
                            <Skeleton active style={{ marginTop: "10px" }} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (data?.data?.length === 0 && !isLoading)
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rooms match in list." className="mt-24" />

    return (
        <div className="relative h-full w-full">
            {isShowMap ? (
                <div className="absolute inset-0 h-screen">
                    <HomeMap dataRooms={data?.data || []} />
                </div>
            ) : (
                <div className="my-6">
                    <div className="mx-auto max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {data?.data?.map((dataRoom: IRoomFinding) => (
                                <ListingCard key={dataRoom.id} dataRoom={dataRoom} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={() => {
                    setIsShowMap((state) => !state)
                }}
                className="fixed bottom-8 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
            >
                {!isShowMap ? "Show map" : "Show list"}{" "}
                <span>{!isShowMap ? <BsMapFill /> : <AiOutlineUnorderedList />}</span>
            </button>
        </div>
    )
}

export default Checklist
