import { createSlice } from "@reduxjs/toolkit"

interface menuState {
  opened: boolean,
  logging_in: boolean,
  signing_up: boolean,
  confirming_email: boolean
}

const initialState: menuState = {
  opened: false,
  logging_in: false,
  signing_up: false,
  confirming_email: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.opened = !state.opened
    },
    toggleLogIn: state => {
      state.logging_in = !state.logging_in
      state.signing_up = false
      state.confirming_email = false
    },
    toggleSignUp: state => {
      state.logging_in = false
      state.signing_up = !state.signing_up
      state.confirming_email = false
    },
    toggleConfirmEmail: state => {
      state.logging_in = false
      state.signing_up = false
      state.confirming_email = !state.confirming_email
    }
  }
})

export const { toggleMenu, toggleLogIn, toggleSignUp, toggleConfirmEmail } = menuSlice.actions
export default menuSlice.reducer