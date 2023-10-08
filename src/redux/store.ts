import { combineReducers, configureStore } from "@reduxjs/toolkit"
// features
import { userApi } from "@/redux/services/user/user.service"
import { authApi } from "@/redux/services/auth/auth.service"
// slices
import authSlice from "@/redux/features/auth/auth.slice"
import searchSlice from "@/redux/features/search/search.slice"
import modalSlice from "./features/modal/modal.slice"

const rootReducer = combineReducers({
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    search: searchSlice,
    modal: modalSlice,
    auth: authSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
