import { IUser } from "./user.interface"

export interface IAuth {
    accessToken: string | null
    userInfo: IUser | null
}
export interface IAuthResponse {
    data: IUser[]
    message: string
    status: string
}
