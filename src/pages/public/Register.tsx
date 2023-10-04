import { useState } from "react"
import { ButtonAuth, InputWithLabel } from "@/components"
import Select from "react-select"
import mail from "@/assets/images/mailsvg.svg"
import { Formik, Form } from "formik"
import { Link, useNavigate } from "react-router-dom"
import {
    useRegisterMutation,
    useRegisterVerificationMutation,
    useResendEmailMutation,
    useContinueWithGGMutation
} from "@/redux/services/auth/auth.service"
import { useGoogleLogin } from "@react-oauth/google"
import logoGG from "@/assets/images/logoGG.svg"

import { useAppDispatch } from "@/redux/hook"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { motion } from "framer-motion"
import * as Yup from "yup"

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
    const dispatch = useAppDispatch()

    const [isPermitted, setIsPermitted] = useState<boolean>(false)
    const [code, setCode] = useState<{ email: string; code: string }>({ email: "", code: "" })
    const [register] = useRegisterMutation()
    const [registerVerification] = useRegisterVerificationMutation()
    const [resendEmail] = useResendEmailMutation()
    const [continueWithGG] = useContinueWithGGMutation()

    const initialValues: Values = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        role: "",
        confirmPassword: ""
    }

    const SignupSchema = Yup.object().shape<Values>({
        email: Yup.string().email("Email is invalid!").required("Email Required!"),
        firstName: Yup.string().required("Firstname Required!"),
        lastName: Yup.string().required("Lastname Required!"),

        password: Yup.string().min(4, "Password must be minimum 4 digits!").required("Password Required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password must match!")
            .required("Confirm password is reqired!"),
        phoneNumber: Yup.string()
            .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Invalid phone number")
            .required("Number phone must be required!"),
        role: Yup.string().required("Role Required!")
    })

    const submitForm = async (values: Values) => {
        const { confirmPassword, ...body } = values
        console.log(body, confirmPassword)
        const res = await register(body).unwrap()
        if (res.status === "SUCCESS") {
            setIsPermitted(true)
            setCode((pre) => ({ ...pre, email: body.email }))
        }
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
        const res = await resendEmail({ email: code.email }).unwrap()
        console.log(res)
    }

    const registerWithGG = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse.access_token || "")
            const res = await continueWithGG({ accessToken: tokenResponse.access_token || "" }).unwrap()
            if (res.status === "SUCCESS") {
                dispatch(setCredentials({ accessToken: res.data.token }))
                navigate("/")
            }
        },
        onError: () => {
            console.log("Login Failed")
        }
    })
    return (
        <>
            {!isPermitted ? (
                <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={submitForm}>
                    {(formik) => {
                        const { values, handleChange, handleSubmit } = formik
                        // console.log(errors)
                        return (
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -30, opacity: 0 }}
                                className="flex w-full flex-col items-center justify-center"
                            >
                                <h1 className="text-[40px] font-semibold text-primary ">Create new account</h1>
                                <div className="mt-3">
                                    <p className="mb-1 text-[14px] text-primary">
                                        Already a member?
                                        <Link
                                            to={"/account/login"}
                                            className="font-medium text-secondary1 hover:underline"
                                        >
                                            {" "}
                                            Login now
                                        </Link>
                                    </p>
                                    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <InputWithLabel
                                            placeholer="Email *"
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />

                                        <InputWithLabel
                                            placeholer="Password *"
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                        />

                                        <InputWithLabel
                                            placeholer="Confirm password *"
                                            type="password"
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                        />

                                        <InputWithLabel
                                            placeholer="Firstname *"
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                        />

                                        <InputWithLabel
                                            placeholer="Lastname *"
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                        />

                                        <InputWithLabel
                                            placeholer="Phone number *"
                                            type="text"
                                            name="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                        />

                                        <div>
                                            <p className="mb-1 text-[14px] font-medium text-secondary1">
                                                Which describes best your role?
                                            </p>
                                            <Select
                                                name="role"
                                                placeholder="Role"
                                                styles={{
                                                    control: (provided, state) => ({
                                                        ...provided,
                                                        height: "40px",
                                                        width: "360px",
                                                        borderRadius: "0.5rem",
                                                        borderWidth: "2px",
                                                        borderColor: state.isFocused ? "#E3641C" : "#D1D5DB",
                                                        backgroundColor: state.isFocused ? "#FFFFFF" : "#E5E7EB",

                                                        outline: "none"
                                                    }),
                                                    placeholder: (provided) => ({
                                                        ...provided,
                                                        fontSize: "18px",
                                                        fontWeight: "normal",
                                                        color: "rgba(60,64,67,0.8)"
                                                    }),
                                                    option: (styles, { isFocused, isSelected }) => {
                                                        return {
                                                            ...styles,
                                                            backgroundColor: isSelected
                                                                ? "rgba(227, 100, 28, 1)"
                                                                : isFocused
                                                                ? "rgba(227, 100, 28,0.6 )"
                                                                : undefined
                                                        }
                                                    }
                                                }}
                                                value={options.find((option) => option.value === values.role)}
                                                onChange={(selectedOption) => {
                                                    handleChange("role")(selectedOption ? selectedOption.value : "")
                                                }}
                                                options={options}
                                            />
                                        </div>

                                        <ButtonAuth text="Register" type="submit" />
                                    </Form>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            className="flex items-center justify-center gap-2 rounded-[6px] border-2 border-neutral-300 p-1 text-[14px] hover:border-neutral-500 hover:bg-slate-200"
                                            onClick={() => registerWithGG()}
                                        >
                                            Countinue with <img src={logoGG} alt="logoGG" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }}
                </Formik>
            ) : (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -30, opacity: 0 }}
                >
                    <div className="relative flex w-full flex-col items-center justify-center">
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
                                <span
                                    className="cursor-pointer text-[14px] text-secondary1"
                                    onClick={() => handleResetPassword()}
                                >
                                    {" "}
                                    Click to resend
                                </span>{" "}
                            </p>
                        </div>
                        <div className="absolute bottom-[-120px] left-0 flex w-full justify-center ">
                            <p className="mb-1 text-[14px] text-primary">
                                Back to
                                <Link to={"/account/login"} className="text-secondary1 hover:underline">
                                    {" "}
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    )
}

export default Register
