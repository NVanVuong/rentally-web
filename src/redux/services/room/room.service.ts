import { creatApiWithAuth } from "../apiWithAuth.service"

const createRoomWithAuth = creatApiWithAuth("roomApi", ["Rooms"])

export const roomApi = createRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomsInBlocks: builder.query<any, any>({
            query({ role, id, keyword }) {
                return `/${role}/room-blocks/${id}/rooms?keyword=${keyword}`
            },
            providesTags: ["Rooms"]
        }),
        createRooms: builder.mutation<any, any>({
            query: ({ role, body }) => ({
                url: `/${role}/rooms`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        deleteRoom: builder.mutation<any, any>({
            query: ({ role, id }) => ({
                url: `/${role}/rooms/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Rooms"]
        }),

        UpdateRoom: builder.mutation<any, any>({
            query: ({ role, id, body }) => ({
                url: `/${role}/rooms/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        UpdateImages: builder.mutation<
            { status: string; message: string; data: string[] },
            { id: string; body: FormData }
        >({
            query: ({ body, id }) => ({
                url: `/aws/upload?id=${id}`,
                method: "POST",
                body
            })
        })
    })
})

export const {
    useCreateRoomsMutation,
    useDeleteRoomMutation,
    useGetRoomsInBlocksQuery,
    useUpdateImagesMutation,
    useUpdateRoomMutation
} = roomApi
