import { useAppSelector } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"

const MODAL_TITLES = {
    [MODAL.ADD]: "Register New Account",
    [MODAL.UPDATE]: "Edit Account Information",
    [MODAL.DELETE]: "Remove Account",
    [MODAL.DISABLE]: "Deactivate Account",
    [MODAL.VIEW]: "Account Overview"
}

const ModalTitle = () => {
    const type = useAppSelector((state) => state.modal.type)

    if (!type) return

    return <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">{MODAL_TITLES[type]}</div>
}

export default ModalTitle
