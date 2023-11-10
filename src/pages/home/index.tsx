import Header from "@/container/Header"
import { Outlet } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Home
