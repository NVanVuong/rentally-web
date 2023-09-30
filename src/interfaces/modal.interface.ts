import { MODAL } from "@/utils/constants/GlobalConst"

export type IModalTypes = MODAL.ADD | MODAL.UPDATE | MODAL.DELETE | MODAL.DISABLE | MODAL.VIEW

export interface IModal {
    isOpen: boolean
    type?: IModalTypes | null
    id?: string | null
}

export interface IOpenModalPayload {
    type?: IModalTypes
    id?: string
}
