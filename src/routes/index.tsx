import { SITE_MAP } from "@/utils/constants/Path"
import { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import("../pages/home"))
const AdminPage = lazy(() => import("../pages/admin"))
const UsersPage = lazy(() => import("../pages/admin/users"))
const ModsPage = lazy(() => import("../pages/admin/mods"))
const PropsPage = lazy(() => import("../pages/admin/props"))

const MainRoute = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                    <Route index element={<Navigate to={SITE_MAP.USERS_MANAGEMENT} replace />} />
                    <Route path={SITE_MAP.USERS_MANAGEMENT} element={<UsersPage />} />
                    <Route path={SITE_MAP.MODS_MANAGEMENT} element={<ModsPage />} />
                    <Route path={SITE_MAP.PROPS_MANAGEMENT} element={<PropsPage />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default MainRoute
