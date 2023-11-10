import { IRoomBlock } from "./block.interface"
import { ILandlord } from "./user.interface"

export interface IRoomDetail {
    id: string
    price: string
    images: string[]
    utilities: IUtility[]
    roomblock: IRoomBlock
    landlord: ILandlord
    ratingDetail: {
        ratings: IRating[]
        avgRate: number
        avgClean: number
        avgLocation: number
        avgSecurity: number
        avgSupport: number
        totalRating: number
    }
}

export interface IUtility {
    id: number
    name: string
    note: string
    icon: string
}

export interface IRating {
    id: number
    createdAt: string
    comment: string
    cleanRate: number
    locationRate: number
    securityRate: number
    supportRate: number
    avgRate: string
    renterName: string
    renterPhoto: string
}