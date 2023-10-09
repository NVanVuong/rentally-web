
import { GoogleOAuthProvider } from "@react-oauth/google"
import MainRoute from "./routes"

const App: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId="835753748894-nkpb4ri9qqer621v4sq06u7imce8bnri.apps.googleusercontent.com">           
                <MainRoute />       
        </GoogleOAuthProvider>
    )
}

export default App
