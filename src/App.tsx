import { Login, Register, ForgotPassword, ResetPassword } from "@/pages/public"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { path } from "@/utils/constants"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Account from "@/Layouts/Account"
import MainRoute from "./routes"

const App: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId="835753748894-nkpb4ri9qqer621v4sq06u7imce8bnri.apps.googleusercontent.com">
        <div className="flex h-screen items-center justify-center">
            <span className="animate-bounce text-3xl font-bold">Hello, i am Rentally</span>
        </div>
        </GoogleOAuthProvider>
    )
}

export default App
