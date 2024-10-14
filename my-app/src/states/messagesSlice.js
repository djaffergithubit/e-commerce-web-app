import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: []
}

const messagesSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload)
            return state
        },

        removeMessage: (state, action) => {
            const { messageId } = action.payload
            const currentState = [...state.messages]
            const newState = currentState.filter(message => message.id !== messageId)
            state.messages = newState
            return state
        },

        clearMessages: (state) => {
            state.messages = []
            return state
        }
    }
})

export const allMessages = state => state.messages.messages
export const { addMessage, removeMessage, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer