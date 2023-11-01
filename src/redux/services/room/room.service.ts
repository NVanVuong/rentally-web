import { creatApiWithAuth } from "../apiWithAuth.service"

const createModRoomWithAuth = creatApiWithAuth("modRoomApi", ["ModRooms"])

export const modRoomApi = createModRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getModRoomsInBlocks: builder.query<any, any>({
            query({ id, keyword }) {
                return `/mod/room-blocks/${id}/rooms?keyword=${keyword}`
            },
            providesTags: ["ModRooms"]
        }),
        createModRooms: builder.mutation<any, any>({
            query: (body) => ({
                url: `/mod/rooms`,
                method: "POST",
                body
            }),
            invalidatesTags: ["ModRooms"]
        }),
        deleteModRoom: builder.mutation<any, any>({
            query: ({ id }) => ({
                url: `/mod/rooms/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["ModRooms"]
        }),

        UpdateModRoom: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/mod/rooms/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["ModRooms"]
        }),
        UpdateRoomImages: builder.mutation<
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
    useCreateModRoomsMutation,
    useDeleteModRoomMutation,
    useGetModRoomsInBlocksQuery,
    useUpdateRoomImagesMutation,
    useUpdateModRoomMutation
} = modRoomApi
