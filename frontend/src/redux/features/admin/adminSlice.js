import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

// Urls
import { post_Login } from "../../../lib/api/index";

const initialState = {
    ready: false,
    loading: true,
    token: '',
    expires: null,
    error: false,
    mobileMenu: false,
}


export const setupAuth = createAsyncThunk(
    'admin/setupAuth',
    async (arg, thunkAPI) => {
        const { email, phone, password } = arg
        try {
            const res = await post_Login({ email, phone, password })
            return {
                token: res.token,
                expires: res.expires
            }
        } catch (error) {
            return thunkAPI.rejectWithValue({
                message: error.message,
                status: error.status
            })
        }

    }
)


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAuth: (state, action) => {
            console.log('Logout event')
            state.loading = false
            state.error = null
            state.token = null
            state.expires = null
            state.ready = false
            state.data = null
        },
        showMobileMenu: (state, action) => {
            state.mobileMenu = true
        },
        closeMobileMenu: (state, action) => {
            state.mobileMenu = false
        }
    },
    extraReducers: {
        [setupAuth.fulfilled]: (state, action) => {
            console.log('Auth Fufilled')

            // Payload - token, status
            state.error = null
            state.token = action.payload.token
            state.expires = action.payload.expires
            state.ready = true
            state.loading = false
        },
        [setupAuth.rejected]: (state, action) => {
            console.log('Auth Rejected')

            // Payload - message, status
            state.error = action.payload.message
            state.token = null
            state.ready = false
            state.loading = false
        },


    }

})

export const { clearAuth, showMobileMenu, closeMobileMenu } = adminSlice.actions
export default adminSlice.reducer