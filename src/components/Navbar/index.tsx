import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"
import { Link } from "react-router-dom"
import { logOut } from "@/redux/features/auth/auth.slice"

const NavBar = () => {
    const role = useAppSelector((state) => state.auth.userInfo?.role) || ""
    const dispatch = useAppDispatch()

    return (
        <nav className="flex gap-4 font-bold">
            <Link to={SITE_MAP.INDEX}>Home</Link>
            {role === ROLE.ADMIN ? (
                <Link to={SITE_MAP.ADMIN}>Admin</Link>
            ) : role === ROLE.MOD ? (
                <Link to={SITE_MAP.MOD}>Mod</Link>
            ) : null}

            {role !== "" ? (
                <p className="cursor-pointer"
                    onClick={() => {
                        dispatch(logOut())
                    }}
                >
                    Logout
                </p>
            ) : (
                <Link to={SITE_MAP.AUTH.LOGIN}>Login</Link>
            )}
        </nav>
    )
}

export default NavBar
