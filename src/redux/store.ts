import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { creatApiWithAuth } from '@/redux/services/apiWithAuth.service'
import authSlice from '@/redux/features/auth/auth.slice'

const rootReducer = combineReducers({
  [creatApiWithAuth.reducerPath]: creatApiWithAuth.reducer,
  auth: authSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creatApiWithAuth.middleware),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch