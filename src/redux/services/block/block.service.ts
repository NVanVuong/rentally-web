import { createApiWithAuth } from "../apiWithAuth.service"

const createApiRoomBlockWithAuth = createApiWithAuth("roomBlockApi", ["Blocks"])
export const roomBlockApi = createApiRoomBlockWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomBlocks: builder.query({
            query: () => "/admin/room-blocks",
            providesTags: ["Blocks"]
        }),
        createRoomBlock: builder.mutation<any, any>({
            query: (body) => ({
                url: `/admin/room-blocks`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Blocks"]
        }),
        updateRoomBlock: builder.mutation<any, any>({
            query: ({ id, formData }) => {
                return {
                    url: `/admin/room-blocks/${id}`,
                    method: "PATCH",
                    body: formData
                }
            },
            invalidatesTags: ["Blocks"]
        }),
        deleteRoomBlock: builder.mutation<any, any>({
            query: (id) => ({
                url: `/admin/room-blocks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Blocks"]
        })
    })
})

export const {
    useGetRoomBlocksQuery,
    useCreateRoomBlockMutation,
    useUpdateRoomBlockMutation,
    useDeleteRoomBlockMutation
} = roomBlockApi
