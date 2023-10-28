export interface IRoom {
    id?: string
    area: string
    roomName: string
    price: string
    depositAmount: string
    images?: string
    utilities?: any
}
export interface IRoomQuery {
    keyword: string
}
