import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface userState {
  is_auth: boolean,
  user_id: string | null
}

const initialState: userState = {
  is_auth: false,
  user_id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user_id: string }>) => {
      state.is_auth = action.payload.user_id ? true : false
      state.user_id = action.payload.user_id
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer