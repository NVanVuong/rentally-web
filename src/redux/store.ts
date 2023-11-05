import { combineReducers, configureStore } from "@reduxjs/toolkit"
// features
import { authApi } from "@/redux/services/auth/auth.service"
import { userApi } from "@/redux/services/user/user.service"
import { roomBlockApi } from "@/redux/services/block/block.service"
// slices
import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import searchMapSlice from "./features/search-map/search-map.slice"
import modalSlice from "./features/modal/modal.slice"

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomBlockApi.reducerPath]: roomBlockApi.reducer,
    search: searchSlice,
    searchMap: searchMapSlice,
    modal: modalSlice,
    auth: authSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, roomBlockApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
