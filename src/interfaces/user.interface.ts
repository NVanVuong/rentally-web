export interface IUser {
    id: number
    googleId: string
    email: string
    firstName: string
    lastName: string
    photo: string
    phoneNumber: string
    role: string
}

export interface IUserQuery {
    limit?: number
    pageNo?: number
    keyword?: string
    sortDir?: "asc" | "desc"
    sortField?: Array<"id" | "googleId" | "email" | "firstName" | "role" | "phone_number">
}

export interface IUsersResponse {
    users: IUser[]
    totalItems: number
    totalPages: number
    currentPage: number
}
