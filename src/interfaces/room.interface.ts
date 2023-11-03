export interface IRoom {
    id?: string
    area: number
    roomName: string
    price: number
    depositAmount: number
    images?: File[] | string[]
    utilities?: string[]
    status?: string
}
export interface IRoomQuery {
    keyword: string
}
