import { createSlice } from "@reduxjs/toolkit";

const initialState = Date.now()

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        updateSession: (state, action) => {
            return Date.now()
        },
    },
    extraReducers: {}

})

export const { updateSession } = sessionSlice.actions

export default sessionSlice.reducer