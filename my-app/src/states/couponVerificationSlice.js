import { createSlice } from "@reduxjs/toolkit"

const initialState = false

const couponVerificationSlice = createSlice({
    initialState, 
    name: 'couponVerification',
    reducers: {
        setCouponVerificationTrue: (state) => {
            state = true
            return state
        },

        setCouponVerificationFalse: (state) => {
            state = false
            return state
        }

    }
})

export const selectCouponVerification = state => state.couponVerification
export const { setCouponVerificationTrue, setCouponVerificationFalse } = couponVerificationSlice.actions
export default couponVerificationSlice.reducer