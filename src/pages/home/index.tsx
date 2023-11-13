import ListingCard from "@/components/Card/ListingCard"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { useGetFindingRoomsQuery } from "@/redux/services/findingRoom/findingRoom.service"
import { Spin } from "antd"

const Home = () => {
    const [searchParams] = useSearchParams()

    useGetUtilitiesQuery("")

    const [switchScreen, setSwitchScreen] = useState(false)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})
    const { data, isLoading, isFetching } = useGetFindingRoomsQuery(searchParamsObject)

    const dataRooms = data?.data as IRoomFinding[]

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

    return (
        <Spin spinning={isLoading || isFetching}>
            <div className="relative mt-6 h-screen w-full">
                {switchScreen ? (
                    data?.data?.length !== 0 ? (
<<<<<<< HEAD
                        <HomeMap dataRooms={dataRooms} />
=======
                        <HomeMap dataRooms={data?.data||[]} />
>>>>>>> 29369055b1c21ee651ad1a12479157e198a5f18e
                    ) : (
                        <p>No</p>
                    )
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
        </Spin>
    )
}

export default Home
