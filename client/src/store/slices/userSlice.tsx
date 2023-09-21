import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface userState {
  is_auth?: boolean
  _id?: string
  username: string
  display_name: string
  email: string
}

const initialState: userState = {
  is_auth: false,
  _id: "",
  username: "",
  display_name: "",
  email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState>) => {
      state.is_auth = true
      if(action.payload._id) state._id = action.payload._id
      state.username = action.payload.username
      state.display_name = action.payload.display_name
      state.email = action.payload.email
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer