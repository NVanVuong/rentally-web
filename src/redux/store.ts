import { combineReducers, configureStore } from "@reduxjs/toolkit"
// features
import { userApi } from "@/redux/services/user/user.service"
import { authApi } from "@/redux/services/auth/auth.service"
// slices
import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import modalSlice from "./features/modal/modal.slice"
import generateRoomSlice from "./features/generateRoom/generateRoom.slice"
import { helpApi } from "./services/help/help.service"

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [helpApi.reducerPath]: helpApi.reducer,
    search: searchSlice,
    modal: modalSlice,
    auth: authSlice.reducer,
    generateRoom: generateRoomSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, authApi.middleware, helpApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
