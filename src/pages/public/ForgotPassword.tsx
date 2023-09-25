import React from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
interface Props {}

const ForgotPassword = (props: Props) => {
    return (
        <div className="flex w-full flex-col items-center justify-center ">
            <div className="m-8">
                <h1 className="text-[24px] font-semibold text-primary ">Forgot Password?</h1>
                <p className="mb-1 text-[14px] text-primary">No worries, we'll send you reset password instruction</p>
                <div className="flex flex-col gap-8">
                    <InputWithLabel placeholer="Email *" type="text" />
                    <ButtonAuth text="Reset password" onClick={() => {}} />
                </div>
            </div>
            <div className="absolute bottom-20 left-0 flex w-full justify-center ">
                <p className="mb-1 text-[14px] text-primary">
                    Back to<span className="text-secondary1"> Login</span>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword
