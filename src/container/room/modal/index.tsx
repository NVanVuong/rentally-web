import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import Modal from "./Modal"
import DeleteModal from "./DeleteModal"

const ModalProps = () => {
    const type = useAppSelector((state) => state.modal.type)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD:
            case MODAL.UPDATE:
            case MODAL.VIEW:
                return <Modal />
            case MODAL.DELETE:
                return <DeleteModal />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalProps
