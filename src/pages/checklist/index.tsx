import { useEffect, useState } from "react"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { useSearchParams } from "react-router-dom"
import ListingCard from "@/components/Card/ListingCard"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { Skeleton } from "antd"
import { Empty } from "@/assets/images"
import { useGetChecklistQuery } from "@/redux/services/checklist/checklist.service"

const Checklist = () => {
    useGetUtilitiesQuery("")
    const [searchParams] = useSearchParams()
    const [switchScreen, setSwitchScreen] = useState(false)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})
    const { data, isLoading, isFetching } = useGetChecklistQuery(searchParamsObject)

    useEffect(() => {
        const params: [string, string][] = []
        for (const entry of searchParams.entries()) {
            params.push(entry as [string, string])
        }

        const newSearchParamsObject: Record<string, string[]> = {}

        params?.forEach((i) => {
            if (Object.keys(newSearchParamsObject).some((item) => item === i[0])) {
                newSearchParamsObject[i[0]] = [...newSearchParamsObject[i[0]], i[1]]
            } else {
                newSearchParamsObject[i[0]] = [i[1]]
            }
        })

        setSearchParamsObject(newSearchParamsObject)
    }, [searchParams])

    if (isLoading || isFetching) {
        return (
            <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-36">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div style={{ width: "280px" }} key={index}>
                            <Skeleton.Image style={{ width: "280px", height: "280px" }} active />
                            <Skeleton active />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (data?.data?.length === 0) {
        return (
            <div className="flex h-[600px] flex-col items-center justify-center gap-4">
                <img src={Empty} className="h-40" alt="empty" />
                <p className="text-[30px] font-bold">No Room matches with your search</p>
            </div>
        )
    }

    return (
        <div className="relative mt-6 h-screen w-full">
            {switchScreen ? (
                <HomeMap dataRooms={data?.data || []} />
            ) : (
                <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-36">
                    <div className="grid grid-cols-1 gap-8  sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {data?.data?.map((dataRoom: IRoomFinding) => (
                            <ListingCard key={dataRoom.id} dataRoom={dataRoom} />
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={() => {
                    setSwitchScreen((state) => !state)
                }}
                className="fixed bottom-10 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
            >
                {!switchScreen ? "Show map" : "Show list"}{" "}
                <span>{!switchScreen ? <BsMapFill /> : <AiOutlineUnorderedList />}</span>
            </button>
        </div>
    )
}

export default Checklist
