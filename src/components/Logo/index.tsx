import { useNavigate } from "react-router-dom"
import RetallyLogo from "../../assets/images/rentally_logo.png"
import RetallyLogoFull from "../../assets/images/rentally_logo_full.png"
import { SITE_MAP } from "@/utils/constants/Path"

interface ILogo {
    isOpen?: boolean
}

const Logo = (props: ILogo) => {
    const { isOpen = true } = props

    const navigate = useNavigate()

    const handleClick = (e: any) => {
        e.stopPropagation()
        navigate(SITE_MAP.INDEX)
    }

    return (
        <img
            onClick={(e) => handleClick(e)}
            className={`${isOpen ? "h-full" : "h-8"} cursor-pointer transition duration-100`}
            src={isOpen ? RetallyLogoFull : RetallyLogo}
            alt="Rentally Logo"
        />
    )
}

export default Logo
