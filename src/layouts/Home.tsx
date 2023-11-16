import Footer from "@/container/Footer"
import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomeLayout
