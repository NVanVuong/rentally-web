import { useAppSelector } from "@/redux/hook"
import { MODAL, STATUS } from "@/utils/constants/GlobalConst"

const ModalTitle = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data)

    const MODAL_TITLES: { [key: string]: string } = {
        [MODAL.ADD.USER]: "Register New Account",
        [MODAL.UPDATE.USER]: "Edit Account Information",
        [MODAL.DELETE.USER]: "Remove Account",
        [MODAL.DISABLE.USER]: data?.status === STATUS.ACTIVE ? "Deactivate Account" : "Activate Account",
        [MODAL.VIEW.USER]: "Account Overview"
    }

    if (!type) return

    return <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">{MODAL_TITLES[type]}</div>
}

export default ModalTitle
