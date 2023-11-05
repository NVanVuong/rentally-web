export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    photo: string
    role: string
    googleId?: string
    status?: string
}

export interface ILandlord {
    id: number
    name: string
    phoneNumber: string
    photo: string
}

export interface IUserQuery {
    keyword: string
}

export interface IUsersResponse {
    data: any
    message: string
    status: string
}

export interface ICreateUserRequest extends FormData {}
export interface IUpdateUserRequest {
    id: number
    formData: FormData
}

export interface IDisableUserRequest {
    id: number
    status: string
}

export interface IDeleteUserRequest extends Pick<IUser, "id"> {}
