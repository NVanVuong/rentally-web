export interface IModal {
    isOpen?: boolean
    type?: any
    id?: string | null
    data?: any
    title?: string
    isActive?: boolean
}

export interface IOpenModalPayload {
    type?: any
    id?: string
    data?: any
}
