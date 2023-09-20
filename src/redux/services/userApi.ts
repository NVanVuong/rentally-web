import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

export interface IUser {
    id: number;
    googleId: string;
    email:string;
    firstName: string;
    lastName: string;
    photo: string;
    phone_number: string;
    role: string;
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], number | void>({
            query(limit = 10) {
                return `/users?limit=${limit}`;
            },
        }),
        getUserById: builder.query<IUser, number>({
            query: (id) => `/users/${id}`,
        }),
        createUser: builder.mutation<IUser, Partial<IUser>>({
            query: (body) => ({
                url: `/users`,
                method: 'POST',
                body,
            }),
        }),
        updateUser: builder.mutation<IUser, Partial<IUser>>({
            query: ({ id, ...patch }) => ({
                url: `/users/${id}`,
                method: 'PATCH',

                body: patch,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;

