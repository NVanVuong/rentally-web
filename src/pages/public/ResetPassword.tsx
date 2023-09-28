import React, { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import mail from "@/assets/images/mailsvg.svg"
import { Link, useNavigate, useParams } from "react-router-dom"


const ResetPassword = () => {
    const navigate = useNavigate()
    const { email } = useParams();
    console.log(email)
    const [isPermitted, SetIsPermitted] = useState(false)

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
                                <InputWithLabel placeholer="Code *" type="text" />
                                <ButtonAuth
                                    text="Reset password"
                                    onClick={() => {
                                        SetIsPermitted(true)
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
                </div>
            ) : (
                <div className="flex w-full flex-col items-center justify-center">
                    <h1 className="text-[40px] font-semibold text-primary ">Reset Password</h1>
                    <div className="mt-3">
                        <p className="my-4 text-[14px] text-primary">
                            In order to <span className="text-secondary1">protect your account</span>, make sure your
                            <br />
                            <span>password:</span>
                            <li className="mx-4">Longer than 8 characters</li>
                            <li className="mx-4">Does not match or contain your username</li>
                        </p>
                        <div className="flex flex-col gap-8">
                            <InputWithLabel placeholer="Password *" type="Password" />
                            <InputWithLabel placeholer="Confirm password *" type="Password" />
                            <ButtonAuth
                                text="Reset password"
                                onClick={() => {
                                    navigate("/")
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
            )}
        </>
    )
}

export default ResetPassword
