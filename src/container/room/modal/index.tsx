import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import Modal from "./Modal"

const ModalProps = () => {
    const type = useAppSelector((state) => state.modal.type)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD:
                return <Modal type="Add " />
            case MODAL.UPDATE:
                return <Modal type="update" />
            case MODAL.VIEW:
                return <Modal type="View" />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalProps
