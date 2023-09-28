import { Link } from "react-router-dom"
import { ButtonAuth, InputWithLabel } from "@/components"
import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import { useLoginMutation } from "@/redux/services/auth/auth.service"
import { setCredentials } from "@/redux/features/auth/auth.slice"
import { useAppDispatch } from "@/redux/hook"

interface Values {
    email: string
    password: string
}
type Errors = {
    email?: string
    password?: string
}

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [login] = useLoginMutation()
    const initialValues: Values = {
        email: "",
        password: ""
    }

    const validate = (values: Values): Errors => {
        const errors: Errors = {}
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
        return errors
    }

    const submitForm = async (values: Values) => {
        console.log(values)
        const data = await login(values).unwrap()
        console.log(data)
        dispatch(setCredentials({ accessToken: data.data.token }))
        navigate("/")
    }

    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={submitForm}>
            {(formik) => {
                const { values, handleChange, handleSubmit, dirty, isValid } = formik
                return (
                    <div className="flex w-full flex-col items-center justify-center">
                        <h1 className="text-[40px] font-semibold text-primary ">Login to your account</h1>
                        <div className="mt-3">
                            <p className="mb-1 text-[14px] text-primary">
                                Not a member?
                                <Link to={"/account/register"} className="font-medium text-secondary1">
                                    Create account
                                </Link>
                            </p>
                            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
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
                                <ButtonAuth text="Login" type="submit" disabled={!(dirty && isValid)} />
                            </form>
                            <div className="mt-4 flex justify-between">
                                <Link to="/account/forgot-password" className="text-[14px] text-primary">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}

export default Login
