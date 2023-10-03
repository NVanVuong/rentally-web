export interface IUser {
    id: number
    googleId: string
    email: string
    firstName: string
    lastName: string
    photo: string
    phoneNumber: string
    role: string
    password?: string
}

export interface IUserQuery {
    limit?: number
    pageNo?: number
    keyword?: string
    sortDir?: "asc" | "desc"
    sortField?: Array<"id" | "googleId" | "email" | "firstName" | "role" | "phone_number">
}

export interface IUsersResponse {
    data: any
    message: string
    status: string
}

export interface IUpdateUserData extends FormData {
    id: number
}
