import React from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import { Link, useNavigate } from "react-router-dom"
interface Props {}

const ForgotPassword = (props: Props) => {
    const navigate = useNavigate()
    return (
        <div className="flex w-full flex-col items-center justify-center ">
            <div className="m-8">
                <h1 className="text-[24px] font-semibold text-primary ">Forgot Password?</h1>
                <p className="mb-1 text-[14px] text-primary">No worries, we'll send you reset password instruction</p>
                <div className="flex flex-col gap-8">
                    <InputWithLabel placeholer="Email *" type="text" />
                    <ButtonAuth
                        text="Reset password"
                        onClick={() => {
                            navigate("/account/reset-password/1")
                        }}
                    />
                </div>
            </div>
            <div className="absolute bottom-20 left-0 flex w-full justify-center ">
                <p className="mb-1 text-[14px] text-primary">
                    Back to
                    <Link to={"/account/login"} className="text-secondary1">
                        {" "}
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
