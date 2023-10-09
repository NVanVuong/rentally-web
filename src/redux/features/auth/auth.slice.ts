import type { IAuth } from "@/interfaces/auth.interface"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IAuth = {
    accessToken: localStorage.getItem("jwt") || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                accessToken: string | null
            }>
        ) => {
            const { accessToken } = action.payload
            state.accessToken = accessToken
            localStorage.setItem("jwt", accessToken as string)
        },

        logOut: (state) => {
            state.accessToken = null
        }
    }
})


export const { setCredentials, logOut } = authSlice.actions

export default authSlice;

export const selectCurrentToken = (state: { auth: IAuth }) => state.auth.accessToken
