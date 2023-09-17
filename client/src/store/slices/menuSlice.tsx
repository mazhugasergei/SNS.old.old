import { createSlice } from "@reduxjs/toolkit"

interface menuState {
  menu_opened: boolean
  expanded_menu: boolean
  logging_in: boolean
  signing_up: boolean
  confirming_email: boolean
  profile_settings: boolean
}

const initialState: menuState = {
  menu_opened: false,
  expanded_menu: false,
  logging_in: false,
  signing_up: false,
  confirming_email: false,
  profile_settings: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenu: state => {
      state.menu_opened = !state.menu_opened
    },
    toggleLogIn: state => {
      state.expanded_menu = !state.expanded_menu
      state.logging_in = !state.logging_in
      state.signing_up = false
      state.confirming_email = false
      state.profile_settings = false
    },
    toggleSignUp: state => {
      state.expanded_menu = !state.expanded_menu
      state.logging_in = false
      state.signing_up = !state.signing_up
      state.confirming_email = false
      state.profile_settings = false
    },
    toggleConfirmEmail: state => {
      state.expanded_menu = !state.expanded_menu
      state.logging_in = false
      state.signing_up = false
      state.confirming_email = !state.confirming_email
      state.profile_settings = false
    },
    toggleProfileSettings: state => {
      state.expanded_menu = !state.expanded_menu
      state.logging_in = false
      state.signing_up = false
      state.confirming_email = false
      state.profile_settings = !state.profile_settings
    }
  }
})

export const { toggleMenu, toggleLogIn, toggleSignUp, toggleConfirmEmail, toggleProfileSettings } = menuSlice.actions
export default menuSlice.reducer