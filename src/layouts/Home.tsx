import Footer from "@/container/Footer"
import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <div className="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout
