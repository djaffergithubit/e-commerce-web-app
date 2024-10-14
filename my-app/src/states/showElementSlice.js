import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('showElement')) || false

const showElementSlice = createSlice({
    initialState,
    name: 'showElement',
    reducers: {
        setShowElement: (state, action) => {
            const {value} = action.payload
            state = value
            localStorage.setItem('showElement', JSON.stringify(state))
            return state
        }
    }
})

export const showElementValue = state => state.showElement
export const { setShowElement } = showElementSlice.actions
export default showElementSlice.reducer