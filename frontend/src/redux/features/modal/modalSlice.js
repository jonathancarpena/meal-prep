import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    sideDrawer: false,
    mobileMenu: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showSidedrawer: (state, action) => {
            state.sideDrawer = true
        },
        closeSidedrawer: (state, action) => {
            state.sideDrawer = false
        },
        showMobileMenu: (state, action) => {
            state.mobileMenu = true
        },
        closeMobileMenu: (state, action) => {
            state.mobileMenu = false
        }

    },
    extraReducers: {}

})

export const { showSidedrawer, closeSidedrawer, showMobileMenu, closeMobileMenu } = modalSlice.actions

export default modalSlice.reducer