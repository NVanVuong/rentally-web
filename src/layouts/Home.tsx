import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default HomeLayout
