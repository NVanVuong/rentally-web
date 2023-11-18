import { useEffect, useState } from "react"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { useSearchParams } from "react-router-dom"
import ListingCard from "@/components/Card/ListingCard"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { useGetFindingRoomsQuery } from "@/redux/services/findingRoom/findingRoom.service"
import { Button, Skeleton } from "antd"
import { Empty } from "@/assets/images"
import ScrollToTop from "@/components/ScrollToTop"

const Home = () => {
    useGetUtilitiesQuery("")

    const [searchParams] = useSearchParams()
    const [switchScreen, setSwitchScreen] = useState(false)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading, isFetching } = useGetFindingRoomsQuery({
        page: currentPage,
        params: searchParamsObject
    })

    const [currentRooms, setCurrentRooms] = useState<IRoomFinding[]>(data?.data?.rooms || [])

    const totalRoom = data?.data?.totalRoom

    const isFull = currentRooms.length === totalRoom

    useEffect(() => {
        setCurrentRooms((prevRooms) => {
            const newRooms = data?.data?.rooms || []
            return Array.from(new Set([...prevRooms, ...newRooms]))
        })
    }, [data, currentPage])

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

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    if (isLoading) {
        return (
            <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-28">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div style={{ width: "280px" }} key={index}>
                            <Skeleton.Image style={{ width: "280px", height: "280px" }} active />
                            <Skeleton active style={{ marginTop: "10px" }} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (currentRooms.length === 0) {
        return (
            <div className="flex h-[600px] flex-col items-center justify-center gap-4">
                <img src={Empty} className="h-32" alt="empty" />
                <p className="text-3xl font-bold">No Room matches with your search</p>
            </div>
        )
    }

    return (
        <div className="relative mt-6 h-full w-full">
            {switchScreen ? (
                <div className="h-full">
                    <HomeMap dataRooms={currentRooms || []} />
                </div>
            ) : (
                <>
                    <div className="mx-auto max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {currentRooms.map((dataRoom: IRoomFinding) => (
                                <ListingCard key={dataRoom.id} dataRoom={dataRoom} />
                            ))}
                        </div>
                    </div>
                    {isFetching && (
                        <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-28">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <div style={{ width: "280px" }} key={index}>
                                        <Skeleton.Image style={{ width: "280px", height: "280px" }} active />
                                        <Skeleton active style={{ marginTop: "10px" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {!isFull ? (
                        <Button
                            loading={isFetching}
                            onClick={handleLoadMore}
                            className="mx-auto my-8 flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white hover:text-white hover:shadow-md hover:shadow-primary/80"
                        >
                            Load more
                        </Button>
                    ) : (
                        <p className="mx-auto my-8 flex h-10 items-center justify-center text-lg font-bold">
                            All rooms loaded.
                        </p>
                    )}
                </>
            )}

            <button
                onClick={() => {
                    setSwitchScreen((state) => !state)
                }}
                className="fixed bottom-8 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
            >
                {!switchScreen ? "Show map" : "Show list"}{" "}
                <span>{!switchScreen ? <BsMapFill /> : <AiOutlineUnorderedList />}</span>
            </button>

            <ScrollToTop />
        </div>
    )
}

export default Home
