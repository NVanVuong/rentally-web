import { setPlaceInfo } from "@/redux/features/search-map/search-map.slice"
import { useAppDispatch } from "@/redux/hook"
import { Input } from "antd"
import { useEffect, useState } from "react"

declare global {
    interface Window {
        placeSearch: any
    }
}

interface ISearchMap {
    myAddress?: string
}

export const SearchMap = (props: ISearchMap) => {
    const dispatch = useAppDispatch()
    const [address, setAddress] = useState<string | undefined>(props.myAddress)

    useEffect(() => {
        const searchMap = document.getElementById("search-map")

        if (searchMap) {
            const search = window.placeSearch({
                key: import.meta.env.VITE_PLACE_SEARCH_KEY,
                container: searchMap,
                useDeviceLocation: true,
                collection: ["poi", "airport", "address", "adminArea", "city", "country"]
            })

            search.on("change", (e: any) => {
                console.log(e)

                if (e.result) {
                    dispatch(setPlaceInfo(e.result))
                    setAddress(e.result.name)
                    search.close()
                }
            })
        }
    }, [])

    return <Input id="search-map" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
}
