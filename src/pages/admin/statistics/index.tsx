import PageHeader from "@/container/PageHeader"
import Revenue from "./revenue"

const Statistics = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Statistics Management" />
            <Revenue />
        </div>
    )
}

export default Statistics
