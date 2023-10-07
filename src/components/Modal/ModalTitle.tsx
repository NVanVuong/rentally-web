import { useAppSelector } from "@/redux/hook"
import { MODAL, STATUS } from "@/utils/constants/GlobalConst"

const ModalTitle = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data)

    const MODAL_TITLES = {
        [MODAL.ADD]: "Register New Account",
        [MODAL.UPDATE]: "Edit Account Information",
        [MODAL.DELETE]: "Remove Account",
        [MODAL.DISABLE]: data?.status === STATUS.ACTIVE ? "Deactivate Account" : "Activate Account",
        [MODAL.VIEW]: "Account Overview"
    }

    if (!type) return

    return <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">{MODAL_TITLES[type]}</div>
}

export default ModalTitle
