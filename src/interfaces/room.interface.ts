export interface IRoom {
    id?: string
    area: number
    roomName: string
    price: number
    depositAmount: number
    images?: File[] | string[]
    utilities?: any
}
export interface IRoomQuery {
    keyword: string
}
