import { ButtonAuth, InputWithLabel } from "@/components"
import React from "react"

interface Props {}

const Login = (props: Props) => {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-[40px] font-semibold text-primary ">Login to your account</h1>
            <div className="mt-3">
                <p className="mb-1 text-[14px] text-primary">
                    Not a member?<span className="font-medium text-secondary1"> Create account</span>
                </p>
                <div className="flex flex-col gap-8">
                    <InputWithLabel placeholer="Email *" type="text" />
                    <InputWithLabel placeholer="Password *" type="Password" />
                    <ButtonAuth text="Login" onClick={() => {}} />
                </div>
                <div className="mt-4 flex justify-between">
                    <p className="text-[14px] text-primary">Forgot your password?</p>
                </div>
            </div>
        </div>
    )
}

export default Login
