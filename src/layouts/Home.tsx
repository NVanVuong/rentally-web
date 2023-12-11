import ScrollToTop from "@/components/ScrollToTop"
import Footer from "@/container/Footer"
import Header from "@/container/Header"
import { SITE_MAP } from "@/utils/constants/Path"
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

const HomeLayout = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const isHome = location.pathname === SITE_MAP.INDEX

    return (
        <div className="flex min-h-screen w-full flex-col overflow-y-auto">
            <Header />

            {!isHome && <div className="h-16" />}

            <div className="grow">
                <Outlet />
            </div>
            <Footer />

            <ScrollToTop />
        </div>
    )
}

export default HomeLayout
