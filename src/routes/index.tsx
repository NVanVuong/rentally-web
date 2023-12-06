import { SITE_MAP } from "@/utils/constants/Path"
import { RequireAuth, RequireAuthAdmin, RequireAuthMod } from "@/layouts/RequireAuth"
import { Suspense, lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import RoomDetail from "../pages/room-detail"
import HomeLayout from "@/layouts/Home"
import Rental from "@/pages/room-detail/rental"
import MyRental from "@/pages/my-rental"
import MyRentalDetail from "@/pages/my-rental/detail"
import MyProfile from "@/pages/my-profile"
import Loading from "@/container/Loading"
import BecomeHost from "@/pages/become-host"
import MyPayment from "@/pages/my-payment"
import MyPaymentDetail from "@/pages/my-payment/detail"

const HomePage = lazy(() => import("../pages/home"))
const AdminPage = lazy(() => import("../pages/admin"))
const ModPage = lazy(() => import("../pages/mod"))
const UsersPage = lazy(() => import("../pages/admin/users"))
const BlocksPage = lazy(() => import("../pages/admin/blocks"))
const UtilitiesPage = lazy(() => import("../pages/admin/utilities"))
const RentalsPage = lazy(() => import("../pages/admin/rentals"))
const TransatcionsPage = lazy(() => import("../pages/admin/transactions"))

const Login = lazy(() => import("../pages/auth/Login"))
const Register = lazy(() => import("../pages/auth/Register"))
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"))
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"))
const GenerateRooms = lazy(() => import("../pages/mod/room/GenerateRooms"))
const RoomsManagement = lazy(() => import("../pages/mod/room/Rooms"))
const AdminRoomsManagement = lazy(() => import("../pages/admin/room/Rooms"))

const Checklist = lazy(() => import("../pages/checklist"))

const MainRoute = () => {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route path={SITE_MAP.INDEX} element={<HomeLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path={SITE_MAP.ROOM_DETAIL} element={<RoomDetail />} />
                        <Route path={SITE_MAP.RENT_DETAIL} element={<Rental />} />
                        <Route element={<RequireAuth />}>
                            <Route path={SITE_MAP.MY_PROFILE} element={<MyProfile />} />
                            <Route path={SITE_MAP.MY_CHECKLIST} element={<Checklist />} />
                            <Route path={SITE_MAP.BECOME_HOST} element={<BecomeHost />} />
                            <Route path={SITE_MAP.MY_RENTAL} element={<MyRental />} />
                            <Route path={SITE_MAP.MY_RENTAL_DETAIL} element={<MyRentalDetail />} />
                            <Route path={SITE_MAP.MY_PAYMENT} element={<MyPayment />} />
                            <Route path={SITE_MAP.MY_PAYMENT_DETAIL} element={<MyPaymentDetail />} />
                        </Route>
                    </Route>
                    <Route element={<RequireAuthAdmin />}>
                        <Route path={SITE_MAP.ADMIN} element={<AdminPage />}>
                            <Route index element={<Navigate to={SITE_MAP.USERS_MANAGEMENT} replace />} />
                            <Route path={SITE_MAP.USERS_MANAGEMENT} element={<UsersPage />} />
                            <Route path={SITE_MAP.BLOCKS_MANAGEMENT} element={<BlocksPage />} />
                            <Route path={SITE_MAP.ROOMS_MANAGEMENT} element={<AdminRoomsManagement />} />
                            <Route path={SITE_MAP.UTILITIES_MANAGEMENT} element={<UtilitiesPage />} />
                            <Route path={SITE_MAP.TRANSACTION_MANAGEMENT} element={<TransatcionsPage />} />
                            <Route path={SITE_MAP.RENTALS} element={<RentalsPage />} />
                        </Route>
                    </Route>
                    <Route element={<RequireAuthMod />}>
                        <Route path={SITE_MAP.MOD} element={<ModPage />}>
                            <Route index element={<Navigate to={SITE_MAP.BLOCKS_MANAGEMENT} replace />} />
                            <Route path={SITE_MAP.BLOCKS_MANAGEMENT} element={<BlocksPage />} />
                            <Route path={SITE_MAP.ROOMS_GENERATION} element={<GenerateRooms />} />
                            <Route path={SITE_MAP.ROOMS_MANAGEMENT} element={<RoomsManagement />} />
                            <Route path={SITE_MAP.UTILITIES_MANAGEMENT} element={<UtilitiesPage />} />
                            <Route path={SITE_MAP.TRANSACTION_MANAGEMENT} element={<TransatcionsPage />} />
                            <Route path={SITE_MAP.RENTALS} element={<RentalsPage />} />
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
