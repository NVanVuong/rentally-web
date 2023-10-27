import { IRoom } from "@/interfaces/room.interface"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    rooms: [] as IRoom[]
}

const generateRoomSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        generateRoom: (
            state,
            action: PayloadAction<{ roomPattern: IRoom, quantity: string }>
        ) => {
            const rooms = []
            const { quantity, roomPattern } = action.payload;
            const quantityValue = parseInt(quantity, 10);
            roomPattern.id = '0'
            roomPattern.roomName = 'F0'
            for (let i = 0; i < quantityValue; i++) {
                const room = {...roomPattern}
                const id = i         
                room.id =`F${id}`
                room.roomName  = `F${id}`
                rooms.push(room);
            }
            state.rooms = rooms;
            console.log(rooms)
        }
    }
})

export const { generateRoom } = generateRoomSlice.actions

export default generateRoomSlice.reducer
