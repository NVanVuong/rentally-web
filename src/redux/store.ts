import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"

import { userApi } from "@/redux/services/user/user.service"
import { authApi } from "@/redux/services/auth/auth.service"
import { roomApi } from "./services/room/room.service"
import { helpApi } from "./services/help/help.service"
import { roomBlockApi } from "./services/block/block.service"

import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import searchMapSlice from "./features/search-map/search-map.slice"
import modalSlice from "./features/modal/modal.slice"
import generateRoomSlice from "./features/generateRoom/generateRoom.slice"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,

    [userApi.reducerPath]: userApi.reducer,
    [roomBlockApi.reducerPath]: roomBlockApi.reducer,
    search: searchSlice,
    searchMap: searchMapSlice,
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
        roomApi.middleware,
        authApi.middleware,
        helpApi.middleware,
        roomBlockApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
