import { createSlice } from "@reduxjs/toolkit"

interface menuState {
  opened: boolean,
  logging_in: boolean,
  signing_up: boolean
}

const initialState: menuState = {
  opened: false,
  logging_in: false,
  signing_up: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleOpened: state => { state.opened = !state.opened },
    toggleLogIn: state => {
      state.logging_in = !state.logging_in
      state.signing_up = false
    },
    toggleSignUp: state => {
      state.logging_in = false
      state.signing_up = !state.signing_up
    }
  }
})

export const { toggleOpened, toggleLogIn, toggleSignUp } = menuSlice.actions
export default menuSlice.reducer