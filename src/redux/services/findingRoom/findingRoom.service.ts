import { IRoomFindingResponse } from "@/interfaces/roomfiding.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApifindingRoomWithAuth = createApiWithAuth("findingRoomApi", ["findingRoom"])

export const findingRoomApi = createApifindingRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getFindingRooms: builder.query<IRoomFindingResponse, { page: number; params: any }>({
            query: ({ page = 1, params }) => {
                return {
                    url: "/finding",
                    params: {
                        page,
                        ...params
                    }
                }
            }
        })
    })
})

export const { useGetFindingRoomsQuery } = findingRoomApi
