import { MODAL } from "@/utils/constants/GlobalConst"
import { IUser, IUsersResponse } from "./user.interface"

export type IModalTypes = MODAL.ADD | MODAL.UPDATE | MODAL.DELETE | MODAL.DISABLE | MODAL.VIEW

export interface IModal {
    isOpen?: boolean
    type?: IModalTypes | null
    id?: string | null
    data?: IUser | null
}

export interface IOpenModalPayload {
    type?: IModalTypes
    id?: string
    data?: IUsersResponse
}
