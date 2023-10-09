import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"

const RequireAuth = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role)

    switch (role) {
        case ROLE.ADMIN:
        case ROLE.USER:
        case ROLE.MOD:
            return <Outlet />
        default:
            return <Navigate to="/" />
    }
}
export default RequireAuth
