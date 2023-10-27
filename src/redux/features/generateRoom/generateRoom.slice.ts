import { IRoom } from "@/interfaces/room.interface"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    rooms: [] as IRoom[]
}

const generateRoomSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        generateRoom: (state, action: PayloadAction<{ roomPattern: IRoom; quantity: string }>) => {
            const rooms = []
            const { quantity, roomPattern } = action.payload
            const quantityValue = parseInt(quantity, 10)
            roomPattern.id = "0"
            roomPattern.roomName = "F0"
            for (let i = 0; i < quantityValue; i++) {
                const room = { ...roomPattern }
                const id = i
                room.id = `${id}`
                room.roomName = `F${id}`
                rooms.push(room)
            }
            state.rooms = rooms
            console.log(state.rooms)
        },

        changeRoomName: (state, action: PayloadAction<{ id: string; roomName: string }>) => {
            const { id, roomName } = action.payload
            state.rooms[parseInt(id, 10)].roomName = roomName
        },
        changeUtilitiesRoom: (state, action: PayloadAction<{ id: string; utilities: string[] }>) => {
            const { id, utilities } = action.payload
            state.rooms[parseInt(id, 10)].utilities = utilities
        },

        saveRoom: (state) => {
            console.log("saveRoom")
            state.rooms = []
        }
    }
})

export const { generateRoom, changeRoomName, saveRoom, changeUtilitiesRoom } = generateRoomSlice.actions

export default generateRoomSlice.reducer
