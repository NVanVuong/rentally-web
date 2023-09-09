import React from "react"

const App: React.FC = () => {
    console.log(import.meta.env.VITE_REACT_APP_API_URL)

    return (
        <div className="flex h-screen items-center justify-center">
            <span className="text-3xl font-bold">Hello, i am Rentally</span>
        </div>
    )
}

export default App
