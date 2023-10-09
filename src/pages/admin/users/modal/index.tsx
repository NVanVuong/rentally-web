import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalUpdate from "./modalUpdate"
import ModalAdd from "./modalAdd"
import ModalView from "./modalView"
import ModalDisable from "./modalDisable"

const ModalUser = () => {
    const type = useAppSelector((state) => state.modal.type)
    const userData = useAppSelector((state) => state.modal.data)

    const getModalContent = () => {
        switch (type) {
            case MODAL.ADD:
                return <ModalAdd />
            case MODAL.UPDATE:
                return <ModalUpdate data={userData} />
            case MODAL.VIEW:
                return <ModalView data={userData} />
            case MODAL.DISABLE:
                return <ModalDisable data={userData} />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalUser
