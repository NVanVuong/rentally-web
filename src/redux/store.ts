import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi } from '@/redux/services/user/user.service'
import { authApi } from '@/redux/services/auth/auth.service'
import authSlice from '@/redux/features/auth/auth.slice'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, authApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch