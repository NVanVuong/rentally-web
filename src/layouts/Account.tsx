import { Navigate } from "react-router-dom"
import Logo from "@/assets/images/Logo.svg"
import Cloud from "@/assets/images/cloud.png"
import { useAppSelector } from "@/redux/hook"
import { RentallyLogo } from "@/assets/images"

type Props = {
    children: string | JSX.Element
}

const Account = ({ children }: Props) => {
    const accessToken = useAppSelector((state) => state.auth.accessToken)

    return !accessToken ? (
        <div className="relative flex h-screen w-screen items-center justify-center">
            <div className="relative flex h-[600px] w-[800px] rounded-[20px] border-neutral-700 shadow-3xl">
                <div className="relative flex flex-1 flex-col items-center rounded-l-[20px] bg-secondary ">
                    <div className="mt-8 w-full px-8 pt-2">
                        <h1 className="text-[30px] font-semibold text-primary ">
                            Finding a<br /> dream room to rent?
                        </h1>
                        <h4 className="text-[18px] font-normal text-white">
                            Create your account and start exploration <br /> with us
                        </h4>
                    </div>
                    <img src={Logo} alt="" className="w-[350px]" />
                    <h3 className="m-4 text-[18px] font-normal text-white">Since 2023</h3>
                    <img src={Cloud} alt="" className="absolute -left-[1px] bottom-0 z-0 w-[300px] rounded-l-[20px]" />
                </div>
                <div className="relative flex-1 rounded-r-[20px] bg-white pb-6">
                    <div className="flex h-full w-full flex-col items-center justify-center  ">
                        <img src={RentallyLogo} alt="" className="w-[40px]" />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/" />
    )
}

export default Account
