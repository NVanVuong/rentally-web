import { SITE_MAP } from "@/utils/constants/Path"
import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import("../pages/Home"))
const UsersPage = lazy(() => import("../pages/Users"))

const MainRoute = () => {
    return (
        <Suspense fallback={<div>Loaonentding...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={SITE_MAP.ADMIN.USERS_MANAGEMENT} element={<UsersPage />} />
            </Routes>
        </Suspense>
    )
}

export default MainRoute
