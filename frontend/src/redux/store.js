import { configureStore } from "@reduxjs/toolkit";
import { loadState } from './browser-storage'
import bagReducer from '../redux/features/bag/bagSlice'
import modalReducer from '../redux/features/modal/modalSlice'
import adminReducer from './features/admin/adminSlice'




export const store = configureStore({
    devTools: true,
    reducer: {
        bag: bagReducer,
        modal: modalReducer,
        admin: adminReducer
    },
    preloadedState: loadState()
})
