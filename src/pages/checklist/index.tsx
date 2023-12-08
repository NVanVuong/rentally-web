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

    if (data?.data?.length === 0 && !isLoading)
        return (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rooms in your checklist." className="mt-24" />
        )

    return (
        <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <h1 className="mb-4 text-2xl font-bold text-secondary">My Checklist</h1>
            {isShowMap ? (
                <div className="absolute inset-0 h-screen">
                    <HomeMap dataRooms={data?.data || []} />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {!isLoading ? (
                        <>
                            {data?.data?.map((dataRoom: IRoomFinding) => (
                                <ListingCard key={dataRoom.id} dataRoom={dataRoom} />
                            ))}
                        </>
                    ) : (
                        <>
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div style={{ width: "100%" }} key={index}>
                                    <Skeleton.Image className="!aspect-square !h-auto !w-full" active />
                                    <Skeleton active style={{ marginTop: "10px" }} />
                                </div>
                            ))}
                        </>
                    )}
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
