import { IRoomFindingResponse } from "@/interfaces/roomfiding.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApifindingRoomWithAuth = createApiWithAuth("findingRoomApi", ["findingRoom"])

export const findingRoomApi = createApifindingRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getFindingRooms: builder.query<IRoomFindingResponse, any>({
            query: (params) => {
                return {
                    url: "/finding",
                    params: params
                }
            }
        })
    })
})

export const { useGetFindingRoomsQuery } = findingRoomApi
