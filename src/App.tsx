import { Login, Register, ForgotPassword, Account, ResetPassword } from "@/pages/public"
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { path } from "@/utils/constants";

const App: React.FC = () => {

    return (
        <div className="flex h-screen items-center justify-center">
            <BrowserRouter >
                <Routes>
                    <Route path={path.AUTH.ACCOUNT} element={<Account />}>
                        <Route path={path.AUTH.LOGIN} element = {<Login/>}/>
                        <Route path={path.AUTH.REGISTER} element = {<Register/>}/>
                        <Route path={path.AUTH.FORGOTPASSWORD} element = {<ForgotPassword/>}/>
                        <Route path={path.AUTH.RESETPASSWORD} element = {<ResetPassword/>}/>

                        <Route path = '*' element = {<Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
