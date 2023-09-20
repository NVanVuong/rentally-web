import { useGetUsersQuery } from "./redux/services/userApi"

const App: React.FC = () => {
    const { data = [], isLoading } = useGetUsersQuery()

    !isLoading && console.log(data)

    return (
        <div className="flex h-screen items-center justify-center">
            <span className="animate-bounce text-3xl font-bold">Hello, i am Rentally</span>
        </div>
    )
}

export default App
