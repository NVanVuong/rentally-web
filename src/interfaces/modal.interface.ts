import { MODAL } from "@/utils/constants/GlobalConst"
import { IUser } from "./user.interface"
import { IRoom } from "./room.interface"

export type IModalTypes = MODAL.ADD | MODAL.UPDATE | MODAL.DELETE | MODAL.DISABLE | MODAL.VIEW

export interface IModal {
    isOpen?: boolean
    type?: IModalTypes | null
    id?: string | null
    data?: IUser | IRoom | null
}

export interface IOpenModalPayload {
    type?: IModalTypes
    id?: string
    data?: IUser | IRoom
}
