import { SITE_MAP } from "@/utils/constants/Path"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="flex gap-4 font-bold">
            <Link to={SITE_MAP.INDEX}>Home</Link>
            <Link to={SITE_MAP.ADMIN}>Admin</Link>
            <Link to={SITE_MAP.AUTH.LOGIN}>Login</Link>
        </nav>
    )
}

export default NavBar
