import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
}


export const registerUser = createAsyncThunk(
    '/auth/register',
    async (form) => {
        const response = await axios.post(
            `${import.meta.env.SERVER_URL}/api/auth/register`,
            form,
            {
                withCredentials: true, 
            },
        )
        console.log('response', response)
        return response.data
    }
)

export const loginUser = createAsyncThunk(
    '/auth/login',
    async (form) => {
        const response = await axios.post(
            `${import.meta.env.SERVER_URL}/api/auth/login`,
            form,
            {
                withCredentials: true, 
            },
        )
        console.log('login response', response)
        return response.data
    }
)

export const checkAuth = createAsyncThunk(
    '/auth/check-auth',
    async () => {
        const response = await axios.get(
            `${import.meta.env.SERVER_URL}/api/auth/check-auth`,
            {
                withCredentials: true,
                headers:{
                    'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate'
                }
            },
        )


        return response.data
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => {
        const result = await axios.post(
            `${import.meta.env.SERVER_URL}/api/auth/logout`, 
            {},
            {
                withCredentials: true
            }

        )

        return result?.data
    }

)


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state, action)=> {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false , 
            state.user = action.payload.success ? action.payload.user : null 
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action ) => {
            state.loading = false, 
            state.user = null, 
            state.isAuthenticated = false
        }).addCase(loginUser.pending, (state) => {
            state.loading = true 
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = action.payload.success ? action.payload.user : null 
            state.isAuthenticated = action.payload.success
        }).addCase(loginUser.rejected, (state, action) => {
            state.loading =  false, 
            state.user = null , 
            state.isAuthenticated = false
        }).addCase(checkAuth.pending, (state)=> {
            state.loading = true
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false, 
            state.user = action.payload.success ? action.payload.user : null
            state.isAuthenticated = action.payload.success
        }).addCase(checkAuth.rejected, (state, action ) => {
            state.loading = false, 
            state.user = null,
            state.isAuthenticated = false
        }).addCase(logoutUser.pending, (state) => {
            state.loading = true
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false,
            state.user = null
            state.isAuthenticated = false
        }).addCase(logoutUser.rejected , (state, action) => {
            state.user = false 
        })
    }
})


export const {setUser} = authSlice.actions
export default authSlice.reducer