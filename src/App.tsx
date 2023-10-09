import { GoogleOAuthProvider } from "@react-oauth/google"
import MainRoute from "./routes"
import { CLIENT_ID } from "@/utils/constants/GlobalConst"

const App: React.FC = () => {
    console.log(CLIENT_ID)
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <MainRoute />
        </GoogleOAuthProvider>
    )
}

export default App
