import { IUser } from "@/interfaces/user.interface"
import { useAppSelector } from "@/redux/hook"
import { MODAL, STATUS } from "@/utils/constants/GlobalConst"

type IModalTitles = {
    [MODAL.ADD]?: string
    [MODAL.UPDATE]?: string
    [MODAL.DELETE]?: string
    [MODAL.DISABLE]?: string
    [MODAL.VIEW]?: string
}

const ModalTitle = () => {
    const type = useAppSelector((state) => state.modal.type)
    const data = useAppSelector((state) => state.modal.data)

    let modalTitles: IModalTitles = {}

    if (data && "fistName" in data) {
        modalTitles = {
            [MODAL.ADD]: "Register New Account",
            [MODAL.UPDATE]: "Edit Account Information",
            [MODAL.DISABLE]: (data as IUser)?.status === STATUS.ACTIVE ? "Deactivate Account" : "Activate Account",
            [MODAL.VIEW]: "Account Overview"
        }
    } else if (data && "roomName" in data) {
        modalTitles = {
            [MODAL.ADD]: "Create New Room",
            [MODAL.UPDATE]: "Edit Room Information",
            [MODAL.DELETE]: "Remove Room",
            [MODAL.VIEW]: "Room Overview"
        }
    }

    if (!type) return null

    return <div className="mb-6 mt-4 text-center text-2xl font-bold text-secondary">{modalTitles[type]}</div>
}

export default ModalTitle
