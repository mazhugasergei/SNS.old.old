import { configureStore } from "@reduxjs/toolkit"
// reducers
import userReducer from './slices/userSlice'
import menuReducer from './slices/menuSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    ui: uiReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch