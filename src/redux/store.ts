import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi } from './services/userApi'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch