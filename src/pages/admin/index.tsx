import Slider from "@/container/Slider"
import { Outlet } from "react-router-dom"

const Admin = () => {
    return (
        <div className="flex">
            <Slider />
            <Outlet />
        </div>
    )
}

export default Admin
