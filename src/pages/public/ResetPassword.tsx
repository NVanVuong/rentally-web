import { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import { Formik } from "formik"
import mail from "@/assets/images/mailsvg.svg"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useResetPasswordMutation, useForgotPasswordVerifyMutation } from "@/redux/services/auth/auth.service"

interface Values {
    password: string
    confirmPassword: string
}

const ResetPassword = () => {
    const navigate = useNavigate()
    const { email } = useParams()
    const [isPermitted, SetIsPermitted] = useState(false)
    const [resetPassword] = useResetPasswordMutation()
    const [forgotPasswordVerify] = useForgotPasswordVerifyMutation()
    const [code, setCode] = useState<string>("")

    const initialValues: Values = {
        password: "",
        confirmPassword: ""
    }

    const validate = (values: Values) => {
        const errors: Partial<Values> = {}
        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 8) {
            errors.password = "Password too short"
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        return errors
    }
    const submitForm = async (values: Values) => {
        const res = await resetPassword({ email: email || "", password: values.password, code: "R-" + code }).unwrap()
        if (res.status === "SUCCESS") {
            navigate("/account/login")
        }
    }
    const handleSubmitCode = async () => {
        console.log(code)
        const res = await forgotPasswordVerify({
            email: email || "",
            code: "R-" + code
        }).unwrap()
        console.log(res)
        if (res.status === "SUCCESS") {
            SetIsPermitted(true)
        }
    }
    return (
        <>
            {!isPermitted ? (
                <div>
                    <div className="flex w-full flex-col items-center justify-center ">
                        <div className="m-8">
                            <div className="mb-6 flex items-center justify-center gap-8">
                                <img src={mail} alt="" />
                                <h1 className="text-[24px] font-semibold text-primary ">Check your email!</h1>
                            </div>
                            <p className="mb-1 px-3 text-[14px] text-primary">
                                We sent a verification code to <br />
                                <span className="text-[14px] text-secondary1">abc@gmail.com</span>{" "}
                            </p>

                            <div className="flex flex-col gap-8">
                                <InputWithLabel
                                    placeholer="Code *"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <ButtonAuth text="Reset password" onClick={handleSubmitCode} />
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
                </div>
            ) : (
                <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                    {(formik) => {
                        const { values, handleChange, handleSubmit, dirty, isValid } = formik

                        return (
                            <div className="flex w-full flex-col items-center justify-center">
                                <h1 className="text-[40px] font-semibold text-primary ">Reset Password</h1>
                                <div className="mt-3">
                                    <p className="my-4 text-[14px] text-primary">
                                        In order to <span className="text-secondary1">protect your account</span>, make
                                        sure your
                                        <br />
                                        <span>password:</span>
                                        <li className="mx-4">Longer than 8 characters</li>
                                        <li className="mx-4">Does not match or contain your username</li>
                                    </p>
                                    <form className="flex flex-col gap-8 " onSubmit={handleSubmit}>
                                        <InputWithLabel
                                            placeholer="Password *"
                                            type="Password"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Confirm password *"
                                            type="Password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        <ButtonAuth
                                            text="Reset password"
                                            type="submit"
                                            disabled={!(dirty && isValid)}
                                        />
                                    </form>
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
                    }}
                </Formik>
            )}
        </>
    )
}

export default ResetPassword
