// import { MODAL } from "@/utils/constants/GlobalConst"
import { IUser } from "./user.interface"

// export type IModalTypes = MODAL.ADD. | MODAL.UPDATE | MODAL.DELETE | MODAL.DISABLE | MODAL.VIEW

export interface IModal {
    isOpen?: boolean
    type?: any
    id?: string | null
    data?: any
}

export interface IOpenModalPayload {
    type?: any
    id?: string
    data?: any
}
