import type { IAuth } from "@/interfaces/auth.interface"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import jwt from "jwt-decode"

const initialState: IAuth = {
    accessToken: localStorage.getItem("jwt") || null,
    userInfo: localStorage.getItem("jwt") ? jwt(localStorage.getItem("jwt") || "") : null
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
            state.userInfo = jwt(accessToken as string)
            // const user = jwt(accessToken as string);
            // console.log(user)
            localStorage.setItem("jwt", accessToken as string)
        },

        logOut: (state) => {
            console.log("haha")
            state.accessToken = null
            localStorage.setItem("jwt", "")
            state.userInfo = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice

export const selectCurrentToken = (state: { auth: IAuth }) => state.auth.accessToken
