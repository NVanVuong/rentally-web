import { MODAL } from "@/utils/constants/GlobalConst"
import { useAppSelector } from "@/redux/hook"
import ModalAntd from "@/components/Modal"
import ModalUpdate from "./modalUpdate"

const ModalUpdatePassword = () => {
    const type = useAppSelector((state) => state.modal.type)
    const getModalContent = () => {
        switch (type) {
            case MODAL.UPDATE.PASSWORD:
                return <ModalUpdate title="Update New Password" />
            default:
                return null
        }
    }

    return <ModalAntd>{getModalContent()}</ModalAntd>
}

export default ModalUpdatePassword
