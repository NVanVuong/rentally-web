import React from "react"
import { Outlet } from "react-router-dom"
import Logo from "@/assets/images/Logo.svg"
import Cloud from "@/assets/images/cloud.png"
import logoRentally from "@/assets/images/rentally-logo.png"
interface Props {}
const Account = (props: Props) => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-200 ">
            <div className="flex h-[800px] w-[1200px] rounded-[20px] border-2 border-neutral-700 ">
                <div className="relative flex flex-1 flex-col items-center rounded-l-[20px] bg-primary">
                    <div className="mt-16 w-full px-16 pt-4">
                        <h1 className="text-[40px] font-semibold text-secondary1 ">
                            Finding a<br /> dream room to rent?
                        </h1>
                        <h4 className="text-[21px] font-normal text-white">
                            Create your account and start exploration <br /> with us
                        </h4>
                    </div>
                    <img src={Logo} alt="" className="w-[510px] " />
                    <h3 className="m-8 text-[21px] font-normal text-white">Since 2023</h3>
                    <img src={Cloud} alt="" className="absolute bottom-0 left-0 z-0 w-[480px] rounded-l-[20px]" />
                </div>
                <div className="relative flex flex-1 flex-col items-center justify-center rounded-r-[20px] bg-white">
                    <img src={logoRentally} alt="" className="w-[96px]" />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

//test git
export default Account
