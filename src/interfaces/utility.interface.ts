export interface IUtiltity {
    name: string
    note: string
    id: string
}
export interface IUtiltityResponse {
    data: {
        utilities: IUtiltity[]
    }
    message: string
    status: string
}
