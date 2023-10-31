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
        })
    })
})

export const { useCreateModRoomsMutation, useDeleteModRoomMutation, useGetModRoomsInBlocksQuery } = modRoomApi
