import React, { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import mail from "@/assets/images/mailsvg.svg"
import { Link, useNavigate } from "react-router-dom"
interface Props {}

const Register = (props: Props) => {
    const navigate = useNavigate()

    const [isPermitted, SetIsPermitted] = useState(false)

    return (
        <>
            {!isPermitted ? (
                <div className="flex w-full flex-col items-center justify-center">
                    <h1 className="text-[40px] font-semibold text-primary ">Login to your account</h1>
                    <div className="mt-3">
                        <p className="mb-1 text-[14px] text-primary">
                            Already a member?
                            <Link to={"account/login"} className="font-medium text-secondary1">
                                {" "}
                                Login now
                            </Link>
                        </p>
                        <div className="flex flex-col gap-4">
                            <InputWithLabel placeholer="Email *" type="text" />
                            <InputWithLabel placeholer="Password *" type="Password" />
                            <InputWithLabel placeholer="Confirm password *" type="Password" />
                            <InputWithLabel placeholer="Firstname *" type="Password" />
                            <InputWithLabel placeholer="Lastname *" type="Password" />
                            <InputWithLabel placeholer="Phone number *" type="Password" />
                            <div>
                                <p className="mb-1 text-[14px] font-medium text-secondary1">
                                    Which describes best your role?
                                </p>
                                <select
                                    aria-label="Role"
                                    className="h-[42px] w-[360px] rounded-lg border-2 border-neutral-300 bg-neutral-200 p-[5px] placeholder:text-[18px] placeholder:font-normal placeholder:text-secondaryBlack/80"
                                >
                                    <option value="">Role *</option>
                                    <option value="0">Renter</option>
                                    <option value="1">Landlord</option>
                                </select>
                            </div>
                            <ButtonAuth
                                text="Register"
                                onClick={() => {
                                    SetIsPermitted(true)
                                }}
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <Link to={"/account/forgot-password"} className="text-[14px] text-primary">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
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
                                    text="Submit"
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-20 left-0 flex w-full justify-center ">
                            <p className="mb-1 text-[14px] text-primary">
                                Back to<span className="text-secondary1"> Login</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register
