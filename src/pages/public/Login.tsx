import React from "react"
import { Link } from "react-router-dom"
import { ButtonAuth, InputWithLabel } from "@/components"
import { useNavigate } from "react-router-dom"
interface Props {}

const Login = (props: Props) => {
    const navigate = useNavigate()

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <h1 className="text-[40px] font-semibold text-primary ">Login to your account</h1>
            <div className="mt-3">
                <p className="mb-1 text-[14px] text-primary">
                    Not a member?
                    <Link to={"/account/register"} className="font-medium text-secondary1">
                        {" "}
                        Create account
                    </Link>
                </p>
                <div className="flex flex-col gap-8">
                    <InputWithLabel placeholer="Email *" type="text" />
                    <InputWithLabel placeholer="Password *" type="Password" />
                    <ButtonAuth
                        text="Login"
                        onClick={() => {
                            navigate("/")
                        }}
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <Link to="/account/forgot-password" className="text-[14px] text-primary">
                        Forgot your password?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
