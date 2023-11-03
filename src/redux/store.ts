import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { userApi } from "@/redux/services/user/user.service"
import { authApi } from "@/redux/services/auth/auth.service"
import { modRoomApi } from "./services/room/modRoom.service"
import { helpApi } from "./services/help/help.service"
import { modRoomBlockApi } from "./services/roomBlock/roomBlock.service"

import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import modalSlice from "./features/modal/modal.slice"
import generateRoomSlice from "./features/generateRoom/generateRoom.slice"

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [modRoomApi.reducerPath]: modRoomApi.reducer,
    [modRoomBlockApi.reducerPath]: modRoomBlockApi.reducer,

    search: searchSlice,
    modal: modalSlice,
    auth: authSlice.reducer,
    generateRoom: generateRoomSlice
})

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware.concat(
        userApi.middleware,
        modRoomApi.middleware,
        modRoomBlockApi.middleware,
        authApi.middleware,
        helpApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
