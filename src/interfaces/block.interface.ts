import { ILandlord } from "./user.interface"

export interface IRoomBlock {
    id: number
    address: string
    city: string
    district: string
    country: string
    coordinate: ICoordinate
    description: string
    landlord: ILandlord
    quantityRooms: number
    emptyRooms: number
}

export interface ICoordinate {
    latitude: number
    longitude: number
}

export interface IRoomBlockRespone {
    data: {
        roomBlocks: IRoomBlock[]
    }
    message: string
    status: string
}

export interface IRoomBlockQuery {
    keyword: string
}

export interface IRoomBlockRequest {
    address: string
    city: string
    district: string
    country: string
    coordinate: ICoordinate
    description: string
    landlordId: number
}
