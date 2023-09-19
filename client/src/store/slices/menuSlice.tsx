import { createSlice } from "@reduxjs/toolkit"

interface menuState {
  menu_opened: boolean
  expanded_menu: boolean
  logging_in: boolean
  signing_up: boolean
  confirming_email: boolean
  editing_profile: boolean
}

const initialState: menuState = {
  menu_opened: false,
  expanded_menu: false,
  logging_in: false,
  signing_up: false,
  confirming_email: false,
  editing_profile: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleMenuOpened: state => { state.menu_opened = !state.menu_opened },
    toggleExpandedMenu: state => { state.expanded_menu = !state.expanded_menu },
    toggleLoggingIn: state => { state.logging_in = !state.logging_in },
    toggleSigningUp: state => { state.signing_up = !state.signing_up },
    toggleConfirmingEmail: state => { state.confirming_email = !state.confirming_email },
    toggleEditingProfile: state => { state.editing_profile = !state.editing_profile },
  }
})

export const {
  toggleMenuOpened,
  toggleExpandedMenu,
  toggleLoggingIn,
  toggleSigningUp,
  toggleConfirmingEmail,
  toggleEditingProfile,
} = menuSlice.actions

export default menuSlice.reducer