export interface IRoomBlock {
    id: number
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    country: string
    coordinate: any
    description: string
}

export interface IRoomBlockQuery {
    keyword: string
}
export interface ICreateRoomBlockRequest extends Omit<IRoomBlock, "id"> {}

export interface IRoomBlockRequest extends Pick<IRoomBlock, "id"> {}

export interface IDeleteRoomBlockRequest extends Pick<IRoomBlock, "id"> {}

export interface IUpdateRoomBlockRequest extends IRoomBlock {}

export interface IRoomBlocksResponse {
    data: IRoomBlock[]
    message: string
    status: string
}
export interface IRoomBlockResponse {
    data: IRoomBlock
    message: string
    status: string
}
