import { BrowserRouter } from "react-router-dom"
import MainRoute from "./routes"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MainRoute />
        </BrowserRouter>
    )
}

export default App
