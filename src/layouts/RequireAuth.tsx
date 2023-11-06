import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"

export  const RequireAuthAdmin = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""

    switch (role) {
        case ROLE.ADMIN:
            return <Outlet />
        default:
            return <Navigate to="/" />
    }
}

export  const RequireAuthMod = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""

    switch (role) {
        case ROLE.MOD:
            return <Outlet />
        default:
            return <Navigate to="/" />
    }
}

