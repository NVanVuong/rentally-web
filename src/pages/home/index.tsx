import Header from "@/container/Header"
import { Outlet } from "react-router-dom"
import ListingCard from "@/components/Card/ListingCard"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import HomeMap from "@/components/Map/HomeMap"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"

import { dataRooms } from "../../../mockdata"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"

const Home = () => {
    const [searchParams] = useSearchParams()
    useGetUtilitiesQuery("")
    const [switchScreen, setSwitchScreen] = useState(false)
    useEffect(() => {
        const params: [string, string][] = []
        for (const entry of searchParams.entries()) {
            params.push(entry as [string, string])
        }

        let searchParamsObject: Record<string, string[]> = {}

        params?.forEach((i) => {
            if (Object.keys(searchParamsObject).some((item) => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })

        console.log(searchParamsObject)
    }, [searchParams])

    return (
        <div className="relative h-screen w-full">
            <div>
                <Header />
                <Outlet />
            </div>
            {switchScreen ? (
                <HomeMap dataRooms={dataRooms} />
            ) : (
                <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20 ">
                    <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {dataRooms.map((dataRoom: IRoomFinding) => (
                            <ListingCard key={dataRoom.id} dataRoom={dataRoom} />
                        ))}
                    </div>
                </div>
            )}
            <button
                onClick={() => {
                    setSwitchScreen((state) => !state)
                }}
                className="fixed bottom-20 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
            >
                {!switchScreen ? "Show map" : "Show list"}{" "}
                <span>{!switchScreen ? <BsMapFill /> : <AiOutlineUnorderedList />}</span>
            </button>
        </div>
    )
}

export default Home
