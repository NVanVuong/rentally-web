import RequireAuth from "@/layout/RequireAuth"
import { SITE_MAP } from "@/utils/constants/Path"
import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

const HomePage = lazy(() => import("../pages/home"))
const AdminPage = lazy(() => import("../pages/admin"))
const UsersPage = lazy(() => import("../pages/admin/users"))
const RoomsPage = lazy(() => import("../pages/admin/rooms"))
const BlocksPage = lazy(() => import("../pages/admin/blocks"))
const Login = lazy(() => import("../pages/auth/Login"))
const Register = lazy(() => import("../pages/auth/Register"))
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"))
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"))

const MainRoute = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route element={<RequireAuth />}>
                        <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                            <Route index element={<Navigate to={SITE_MAP.USERS_MANAGEMENT} replace />} />
                            <Route path={SITE_MAP.USERS_MANAGEMENT} element={<UsersPage />} />
                            <Route path={SITE_MAP.ROOMS_MANAGEMENT} element={<RoomsPage />} />
                            <Route path={SITE_MAP.BLOCKS_MANAGEMENT} element={<BlocksPage />} />
                        </Route>
                    </Route>

                    <Route path={SITE_MAP.AUTH.LOGIN} element={<Login />} />
                    <Route path={SITE_MAP.AUTH.REGISTER} element={<Register />} />
                    <Route path={SITE_MAP.AUTH.FORGOTPASSWORD} element={<ForgotPassword />} />
                    <Route path={SITE_MAP.AUTH.RESETPASSWORD} element={<ResetPassword />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default MainRoute
