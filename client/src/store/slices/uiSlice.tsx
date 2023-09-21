import { createSlice } from "@reduxjs/toolkit"

interface uiState {
  transition: number
}

const initialState: uiState = {
  transition: 250
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {}
})

export const { } = uiSlice.actions
export default uiSlice.reducer