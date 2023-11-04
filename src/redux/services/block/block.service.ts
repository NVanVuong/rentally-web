import { IRoomBlockRequest, IRoomBlock, IRoomBlockRespone } from "@/interfaces/block.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiRoomBlockWithAuth = createApiWithAuth("roomBlockApi", ["Blocks"])
export const roomBlockApi = createApiRoomBlockWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomBlocks: builder.query<IRoomBlockRespone, any>({
            query: () => "/admin/room-blocks",
            providesTags: ["Blocks"]
        }),
        createRoomBlock: builder.mutation<IRoomBlockRespone, IRoomBlockRequest>({
            query: (body) => ({
                url: `/admin/room-blocks`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Blocks"]
        }),
        updateRoomBlock: builder.mutation<IRoomBlockRequest, { id: number; data: IRoomBlockRequest }>({
            query: ({ id, data }) => {
                return {
                    url: `/admin/room-blocks/${id}`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: ["Blocks"]
        }),
        deleteRoomBlock: builder.mutation<void, { id: Pick<IRoomBlock, "id"> }>({
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
