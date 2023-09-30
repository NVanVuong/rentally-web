import { SITE_MAP } from "@/utils/constants/Path"
import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav>
            <Link to={SITE_MAP.INDEX}>Home</Link>
            <Link to={SITE_MAP.ADMIN.USERS_MANAGEMENT}>Admin</Link>
        </nav>
    )
}

export default NavBar
