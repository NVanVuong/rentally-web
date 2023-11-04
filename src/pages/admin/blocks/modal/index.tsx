import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalAdd from "./modalAdd"
import ModalUpdate from "./modalUpdate"
import ModalDelete from "./modalDelete"

const ModalProps = () => {
    const type = useAppSelector((state) => state.modal.type)
    const blockData = useAppSelector((state) => state.modal.data)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD.BLOCK:
                return <ModalAdd />
            case MODAL.UPDATE.BLOCK:
                return <ModalUpdate data={blockData} />
            case MODAL.DELETE.BLOCK:
                return <ModalDelete data={blockData} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalProps
