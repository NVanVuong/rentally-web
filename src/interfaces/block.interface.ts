export interface IRoomBlock {
    id: number
    address: string | null
    city: string
    district: string | null
    country: string
    coordinate: {
        latitude: number
        longitude: number
    }
    description: string
    landlord: {
        id: number
        name: string
        phoneNumber: string
        photo: string
    }
}
