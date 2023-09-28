import { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import {} from "@/redux/services/auth/auth.service"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"
import { useForgotPasswordMutation } from "@/redux/services/auth/auth.service"

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [forgotPassword] = useForgotPasswordMutation()
    const handleResetPassword = async () => {
        const res = await forgotPassword({ email }).unwrap()
        console.log(res)
        if (res.status === "SUCCESS") {
            navigate(`/account/reset-password/${email}`)
        }
    }
    return (
        <div className="flex w-full flex-col items-center justify-center ">
            <div className="m-8">
                <h1 className="text-[24px] font-semibold text-primary ">Forgot Password?</h1>
                <p className="mb-1 text-[14px] text-primary">No worries, we'll send you reset password instruction</p>
                <div className="flex flex-col gap-8">
                    <InputWithLabel
                        placeholer="Email *"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ButtonAuth
                        text="Reset password"
                        onClick={handleResetPassword}
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
