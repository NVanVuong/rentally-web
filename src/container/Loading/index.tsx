import { Spin } from "antd"

const Loading = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Spin spinning={true} />
        </div>
    )
}

export default Loading
