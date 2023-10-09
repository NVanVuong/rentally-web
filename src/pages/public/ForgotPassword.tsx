import { ButtonAuth, InputWithLabel } from "@/components"
import { Link, useNavigate } from "react-router-dom"
import { useForgotPasswordMutation } from "@/redux/services/auth/auth.service"
import { motion } from "framer-motion"
import { Form, Formik } from "formik"
import { message, Spin } from "antd"

interface Values {
    email: string
}

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const initialValues: Values = {
        email: ""
    }

    const validate = (values: Values): Partial<Values> => {
        const errors: Partial<Values> = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if (!values.email) {
            errors.email = "Email is required"
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid Email"
        }
        return errors
    }

    const submitForm = async (values: Values) => {
        const res = await forgotPassword({ email: values.email }).unwrap()
        console.log(res)
        if (res.status === "SUCCESS") {
            navigate(`/account/reset-password/${values.email}`)
        }
    }

    return (
        <Spin spinning={isLoading}>
            <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
                {(formik) => {
                    const { values, handleChange, handleSubmit } = formik
                    return (
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -30, opacity: 0 }}
                            className="relative flex w-full flex-col items-center justify-center"
                        >
                            <div className="m-8">
                                <h1 className="text-[24px] font-semibold text-primary1 ">Forgot Password?</h1>
                                <p className="mb-1 text-[14px] text-primary1">
                                    No worries, we'll send you reset password instruction
                                </p>
                                <Form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                                    <InputWithLabel
                                        placeholer="Email *"
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <ButtonAuth text="Reset password" type="submit" />
                                </Form>
                            </div>
                            <div className="absolute bottom-[-160px] left-0 flex w-full justify-center ">
                                <p className="mb-1 text-[14px] text-primary1">
                                    Back to
                                    <Link to={"/account/login"} className="text-secondary1 hover:underline">
                                        {" "}
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    )
                }}
            </Formik>
        </Spin>
    )
}

export default ForgotPassword
