import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBrand: 'All'
}

const currentBrandSlice = createSlice({
    initialState,
    name: 'currentBrand',
    reducers: {
        setCurrentBrand:(state, action)=>{
            const { value } = action.payload
            state.currentBrand = value
            return state
        }
    }
})

export const currentBrandValue = state => state.currentBrand.currentBrand
export const { setCurrentBrand } = currentBrandSlice.actions
export default currentBrandSlice.reducer