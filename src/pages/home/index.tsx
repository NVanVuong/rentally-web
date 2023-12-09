import { useEffect, useState } from "react"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { useLocation, useSearchParams } from "react-router-dom"
import ListingCard from "@/components/Card/ListingCard"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { useGetFindingRoomsQuery } from "@/redux/services/findingRoom/findingRoom.service"
import { Button, Empty, Skeleton } from "antd"
import { SITE_MAP } from "@/utils/constants/Path"
import HeroSlide from "@/container/HeroSlide"

const Home = () => {
    useGetUtilitiesQuery()

    const location = useLocation()
    const [searchParams] = useSearchParams()
    const [isShowMap, setIsShowMap] = useState(false)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading, isFetching, isSuccess } = useGetFindingRoomsQuery(
        {
            page: currentPage,
            params: searchParamsObject
        },
        {
            refetchOnMountOrArgChange: true
        }
    )

    const [currentRooms, setCurrentRooms] = useState<IRoomFinding[]>(data?.data?.rooms || [])

    const isFull = Number(data?.data?.totalRoom) <= currentRooms.length

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    useEffect(() => {
        if (isSuccess) {
            if (currentPage === 1) {
                setCurrentRooms(data?.data?.rooms || [])
            } else {
                setCurrentRooms((prevRooms) => {
                    const newRooms = data?.data?.rooms || []
                    return Array.from(new Set([...prevRooms, ...newRooms]))
                })
            }
        }
    }, [data, currentPage, isFetching, isSuccess])

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

    const isIndex = location.pathname === SITE_MAP.INDEX

    const isFetchingWhenBack = isFetching && currentPage === 1

    if (currentRooms.length === 0 && !isIndex) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rooms match in list." className="mt-24" />
    }

    return (
        <div className="relative h-full w-full">
            {isShowMap ? (
                <div className="absolute inset-0 h-screen">
                    <HomeMap dataRooms={currentRooms || []} />
                </div>
            ) : (
                <div className="flex h-full flex-col">
                    <HeroSlide />
                    <div className="my-6 grow">
                        {isLoading || isFetchingWhenBack ? (
                            <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <div style={{ width: "100%" }} key={index}>
                                            <Skeleton.Image className="!aspect-square !h-auto !w-full" active />
                                            <Skeleton active style={{ marginTop: "10px" }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mx-auto max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                        {currentRooms.map((dataRoom: IRoomFinding, index) => (
                                            <ListingCard key={dataRoom.id + index} dataRoom={dataRoom} />
                                        ))}
                                        {isFetching && (
                                            <>
                                                {Array.from({ length: 10 }).map((_, index) => (
                                                    <div style={{ width: "100%" }} key={index}>
                                                        <Skeleton.Image
                                                            className="!aspect-square !h-auto !w-full"
                                                            active
                                                        />
                                                        <Skeleton
                                                            active
                                                            paragraph={{ rows: 2 }}
                                                            style={{ marginTop: "10px" }}
                                                        />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>

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

export default Home
