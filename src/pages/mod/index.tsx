import Slider from "@/container/Slider"
import { Outlet } from "react-router-dom"

const Mod = () => {
    return (
        <div className="flex">
            <Slider />
            <Outlet />
        </div>
    )
}

export default Mod
