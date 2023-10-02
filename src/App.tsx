import { Login, Register, ForgotPassword, ResetPassword } from "@/pages/public"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { path } from "@/utils/constants"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Account from "@/Layouts/Account"

const App: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId="835753748894-nkpb4ri9qqer621v4sq06u7imce8bnri.apps.googleusercontent.com">
            <div className="flex h-screen items-center justify-center">
                <BrowserRouter>
                    <Routes>
                        <Route path={path.AUTH.ACCOUNT} element={<Account />}>
                            <Route path={path.AUTH.LOGIN} element={<Login />} />
                            <Route path={path.AUTH.REGISTER} element={<Register />} />
                            <Route path={path.AUTH.FORGOTPASSWORD} element={<ForgotPassword />} />
                            <Route path={path.AUTH.RESETPASSWORD} element={<ResetPassword />} />

                            <Route path="*" element={<Login />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </GoogleOAuthProvider>
    )
}

export default App
