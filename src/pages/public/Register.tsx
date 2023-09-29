import { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import Select from "react-select"
import mail from "@/assets/images/mailsvg.svg"
import { Formik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation, useRegisterVerificationMutation, useResendEmailMutation} from "@/redux/services/auth/auth.service"
// import { useAppDispatch } from "@/redux/hook"

interface Values {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    phoneNumber: string
    role: string
}

const options = [
    { value: "USER", label: "renter" },
    { value: "MOD", label: "Landlord" }
]

const Register = () => {
    const navigate = useNavigate()
    // const dispatch = useAppDispatch()

    const [isPermitted, setIsPermitted] = useState(false)
    const [code, setCode] = useState<{ email: string; code: string }>({ email: "", code: "" })
    const [register] = useRegisterMutation()
    const [registerVerification] = useRegisterVerificationMutation()
    const [resendEmail] = useResendEmailMutation()

    const initialValues: Values = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        confirmPassword: ""
    }

    const validate = (values: Values) => {
        const errors: Partial<Values> = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!values.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email"
        }

        if (!values.password) {
            errors.password = "Password is required"
        } else if (values.password.length < 4) {
            errors.password = "Password too short"
        }

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        if (!values.firstName) {
            errors.firstName = "First name is required"
        }

        if (!values.lastName) {
            errors.lastName = "Last name is required"
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = "Phone number is required"
        }

        if (!values.role) {
            errors.role = "Role is required"
        }

        return errors
    }
    const submitForm = async (values: Values) => {
        const { confirmPassword, ...body } = values
        console.log(body, confirmPassword)
        const res = await register(body).unwrap()
        if (res.status === "SUCCESS") {
            setIsPermitted(true)
            setCode((pre) => ({ ...pre, email: body.email }))
        }

        // dispatch(setCredentials(user));
        // navigate("/");
    }
    const handleSubmitCode = async () => {
        console.log(code)
        const body = {
            email: code.email,
            code: "R-" + code.code
        }
        const res = await registerVerification(body).unwrap()
        console.log(res)
        if (res.status === "SUCCESS") {
            navigate("/account/login")
        }
    }
    const handleResetPassword = async () => {
        const res = await resendEmail({ email:code.email }).unwrap()
        console.log(res)
    }
    return (
        <>
            {!isPermitted ? (
                <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                    {(formik) => {
                        const { values, handleChange, handleSubmit, dirty, isValid } = formik

                        return (
                            <div className="flex w-full flex-col items-center justify-center">
                                <h1 className="text-[40px] font-semibold text-primary ">Login to your account</h1>
                                <div className="mt-3">
                                    <p className="mb-1 text-[14px] text-primary">
                                        Already a member?
                                        <Link to={"/account/login"} className="font-medium text-secondary1">
                                        {' '}Login now
                                        </Link>
                                    </p>
                                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <InputWithLabel
                                            placeholer="Email *"
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Password *"
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Confirm password *"
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Firstname *"
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Lastname *"
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                        />
                                        <InputWithLabel
                                            placeholer="Phone number *"
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                        />
                                        <div>
                                            <p className="mb-1 text-[14px] font-medium text-secondary1">
                                                Which describes best your role?
                                            </p>
                                            <Select
                                                name="role"
                                                styles={customStyles}
                                                value={options.find((option) => option.value === values.role)}
                                                onChange={(selectedOption) => {
                                                    handleChange("role")(selectedOption ? selectedOption.value : "")
                                                }}
                                                options={options}
                                            />
                                        </div>

                                        <ButtonAuth text="Register" type="submit" disabled={!(dirty && isValid)} />
                                    </form>
                                    <div className="mt-4 flex justify-between">
                                        <Link to={"/account/forgot-password"} className="text-[14px] text-primary">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Formik>
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
                                <span className="text-[14px] text-secondary1">{code.email}</span>{" "}
                            </p>

                            <div className="flex flex-col gap-8">
                                <InputWithLabel
                                    placeholer="Code *"
                                    type="text"
                                    name={""}
                                    id={""}
                                    value={code.code}
                                    onChange={(e) => setCode((values) => ({ ...values, code: e.target.value }))}
                                />
                                <ButtonAuth
                                    text="Submit"
                                    onClick={() => {
                                        handleSubmitCode()
                                    }}
                                />
                            </div>
                            <p className="px-3 pt-3 text-[14px] text-primary">
                            Didn't receive the email?
                                <span className="text-[14px] text-secondary1 cursor-pointer" onClick={()=>handleResetPassword()}>{' '}Click to resend</span>{" "}
                            </p>
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
            )}
        </>
    )
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: "2px solid ", // Màu viền
        borderRadius: "8px" // Bo tròn viền
    }),
    option: (provided: any, state: { isFocused: any }) => ({
        ...provided,
        background: state.isFocused ? "#E5E7EB" : "white", // Màu nền khi hover
        color: "#333" // Màu văn bản
    }),
    menu: (provided: any, state: any) => ({
        ...provided
    })
}

export default Register
