import ScrollToTop from "@/components/ScrollToTop"
import Footer from "@/container/Footer"
import Header from "@/container/Header"
import HeroSlide from "@/container/HeroSlide"
import { SITE_MAP } from "@/utils/constants/Path"
import { Outlet, useLocation } from "react-router-dom"

const HomeLayout = () => {
    const location = useLocation()
    const isHome = location.pathname === SITE_MAP.INDEX

    return (
        <div className="flex min-h-screen w-full flex-col overflow-y-auto">
            <Header />
            {isHome && <HeroSlide />}
            <div className="grow">
                <Outlet />
            </div>
            <Footer />

            <ScrollToTop />
        </div>
    )
}

export default HomeLayout
