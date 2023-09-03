import { createSlice } from "@reduxjs/toolkit"

interface menuState {
  opened: boolean
}

const initialState: menuState = {
  opened: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleOpened: state => { state.opened = !state.opened }
  }
})

export const { toggleOpened } = menuSlice.actions
export default menuSlice.reducer