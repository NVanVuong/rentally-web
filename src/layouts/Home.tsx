import Footer from "@/container/Footer"
import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout
