import { creatApiWithAuth } from "../apiWithAuth.service"

const createModRoomWithAuth = creatApiWithAuth("modRoomApi", ["ModRooms"])

export const modRoomApi = createModRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        createModRooms: builder.mutation<any, any>({
            query: (body) => ({
                url: `/mod/rooms`,
                method: "POST",
                body
            })
        })
    })
})

export const { useCreateModRoomsMutation } = modRoomApi
