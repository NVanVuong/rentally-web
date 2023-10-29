import {
    ICreateRoomBlockRequest,
    IRoomBlock,
    IRoomBlockQuery,
    IRoomBlockRequest,
    IRoomBlockResponse,
    IRoomBlocksResponse,
    IUpdateRoomBlockRequest
} from "@/interfaces/roomBlock.interface"
import { creatApiWithAuth } from "../apiWithAuth.service"

const creatRoomBlocksWithAuth = creatApiWithAuth("userApi", ["ModRoomBlocks"])
export const modRoomBlockApi = creatRoomBlocksWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getModRoomBlocks: builder.query<IRoomBlocksResponse, IRoomBlockQuery>({
            query({ keyword = "" }) {
                return `/mod/room-blocks?keyword=${keyword}`
            },
            providesTags: ["RoomBlocks"]
        }),
        getModRoomBlock: builder.query<IRoomBlockResponse, IRoomBlockRequest>({
            query({ id }) {
                return `/mod/room-blocks/${id}`
            }
        }),
        createModRoomBlock: builder.mutation<IRoomBlockResponse, ICreateRoomBlockRequest>({
            query: (body) => ({
                url: `/mod/room-blocks`,
                method: "POST",
                body
            }),
            invalidatesTags: ["RoomBlocks"]
        }),
        updateModRoomBlock: builder.mutation<IRoomBlockResponse, IUpdateRoomBlockRequest>({
            query: ({ id, ...body }) => {
                return {
                    url: `/mod/room-blocks/${id}`,
                    method: "PATCH",
                    body: body
                }
            },
            invalidatesTags: ["RoomBlocks"]
        }),
        deleteModRoomBlock: builder.mutation<void, Pick<IRoomBlock, "id">>({
            query: (id) => ({
                url: `/mod/room-blocks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["RoomBlocks"]
        })
    })
})

export const {
    useGetModRoomBlocksQuery,
    useGetModRoomBlockQuery,
    useCreateModRoomBlockMutation,
    useDeleteModRoomBlockMutation,
    useUpdateModRoomBlockMutation
} = modRoomBlockApi
