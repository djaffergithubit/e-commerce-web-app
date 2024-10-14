import {configureStore} from "@reduxjs/toolkit"
import isAdminReducer from "../states/isAdminSlice"
import authTokenReducer from "../states/tokenSlice"
import isAuthReducer from "../states/isAuth"
import showElementReducer from "../states/showElementSlice"
import showSidebarReducer from "../states/showSidebarSlice"
import activeButtonReducer from "../states/activeButtonSlice"
import cartSlice from "../states/cartSlice"
import currentUserReducer from "../states/currentUserSlice"
import currentBrandReducer from "../states/currentBrandSlice"
import couponVerificationReducer from "../states/couponVerificationSlice"
import messagesReducer from "../states/messagesSlice"

export const Store = configureStore({
    reducer: {
        isAdmin: isAdminReducer,
        authToken: authTokenReducer,
        isAuth: isAuthReducer,
        showElement: showElementReducer,
        showSidebar: showSidebarReducer,
        activeButton: activeButtonReducer,
        cart: cartSlice,
        currentUser: currentUserReducer,
        currentBrand: currentBrandReducer,
        couponVerification: couponVerificationReducer,
        messages: messagesReducer
    }
})