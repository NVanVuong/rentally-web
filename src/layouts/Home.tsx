import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default HomeLayout
