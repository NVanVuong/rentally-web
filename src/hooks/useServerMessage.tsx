import { useEffect } from "react"
import { message } from "antd"
import { useAppDispatch } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
type IServerMessage = {
    error: any
    data: any
}

function useServerMessage({ data, error }: IServerMessage) {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (data && data.status === "success") {
            message.success(data.message)
            dispatch(closeModal())
        } else if (error) {
            message.error(error.data?.message)
        }
    }, [data, error, dispatch])
}

export default useServerMessage
