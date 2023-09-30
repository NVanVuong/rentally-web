import { IModal, IOpenModalPayload } from "@/interfaces/modal.interface"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IModal = {
    isOpen: false,
    type: null,
    id: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<IOpenModalPayload>) => {
            state.isOpen = true
            state.type = action.payload.type
            state.id = action.payload.id
        },
        closeModal: (state) => {
            state.isOpen = false
            state.type = null
            state.id = null
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
