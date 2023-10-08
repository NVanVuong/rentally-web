import { ConfigProvider, Modal } from "antd"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeModal } from "@/redux/features/modal/modal.slice"
import "./style.css"

const ModalAntd = (props: any) => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.modal.isOpen)

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#E36414"
                }
            }}
        >
            <Modal open={isOpen} onCancel={() => dispatch(closeModal())} footer={null} destroyOnClose>
                {props.children}
            </Modal>
        </ConfigProvider>
    )
}

export default ModalAntd
