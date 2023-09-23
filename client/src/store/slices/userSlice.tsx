import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface userState {
  is_auth?: boolean
  _id?: string
  pfp?: string | ArrayBuffer | null
  username: string
  display_name: string
  email?: string
}

const initialState: userState = {
  is_auth: false,
  _id: "",
  pfp: null,
  username: "",
  display_name: "",
  email: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userState | null>) => {
      if(action.payload){
        state.is_auth = true
        if(action.payload._id) state._id = action.payload._id
        state.pfp = action.payload.pfp
        state.username = action.payload.username
        state.display_name = action.payload.display_name
        state.email = action.payload.email
      }
      // null payload to log out
      else{
        state.is_auth = false
        state._id = ""
        state.username = ""
        state.display_name = ""
        state.email = ""
      }
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer