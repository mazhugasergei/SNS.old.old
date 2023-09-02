import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface userState {
  is_auth: boolean,
  _id: string | null
}

const initialState: userState = {
  is_auth: false,
  _id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ _id: string }>) => {
      state.is_auth = action.payload._id ? true : false
      state._id = action.payload._id
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer