import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('showSidebar')) || false

const showSidebarSlice = createSlice({
    initialState,
    name: 'showSidebar',
    reducers: {
        setShowSidebar: (state) => {
            state = !state
            localStorage.setItem('showSidebar', JSON.stringify(state))
            return state
        }
    }
})

export const showSidebarValue = state => state.showSidebar
export const { setShowSidebar } = showSidebarSlice.actions
export default showSidebarSlice.reducer