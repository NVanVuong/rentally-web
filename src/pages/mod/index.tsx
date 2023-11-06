import Slider from "@/container/Slider"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { Outlet } from "react-router-dom"

const Mod = () => {
    useGetUtilitiesQuery("")
    return (
        <div className="flex">
            <Slider />
            <Outlet />
        </div>
    )
}

export default Mod
