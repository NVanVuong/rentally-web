import { IUpdateUserData, IUser, IUserQuery, IUsersResponse } from "@/interfaces/user.interface"
import { creatApiWithAuth } from "../apiWithAuth.service"

const creatApiUserWithAuth = creatApiWithAuth("userApi", ["Users"])
export const userApi = creatApiUserWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<IUsersResponse, IUserQuery>({
            query({ keyword = "" }) {
                return `/users?keyword=${keyword}`
            },
            providesTags: ["Users"]
        }),
        getUserById: builder.query<IUsersResponse, string>({
            query: (id) => `/users/${id}`
        }),
        createUser: builder.mutation<IUsersResponse, FormData>({
            query: (body) => ({
                url: `/users`,
                method: "POST",

                body
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation<IUser, IUpdateUserData>({
            query: ({ id, ...patch }) => ({
                url: `/users/${id}`,
                method: "PATCH",

                body: patch
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApi
