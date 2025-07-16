import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    adminOrders: [],
    adminOrderDetails: null
}


export const getAllAdminOrders = createAsyncThunk(
    'admin/getAllAdminOrders',
    async() => {
        const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/admin/orders/get`)

        return result?.data
    }
)

export const getAdminOrderDetails = createAsyncThunk(
    'admin/getAdminOrderDetails',
    async(orderId) => {
        const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/shopping/order/details/${orderId}`)

        return result?.data
    }
)

export const updateOrderStatus = createAsyncThunk(
    'admin/updateOrderStatus',
    async(statusForm) => {
        console.log('form ', statusForm)
        const result = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/admin/orders/update-status`,
                statusForm
        )

        return result?.data
    }
)


const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.adminOrderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAdminOrders.pending, state => {
            state.isLoading = true
        })
        .addCase(getAllAdminOrders.fulfilled, (state, action)  => {
            // console.log('first', action.payload)
            state.isLoading = false , 
            state.adminOrders = action.payload.allOrdersList
        })
        .addCase(getAllAdminOrders.rejected, (state, action) => {
            state.isLoading = false 
            state.adminOrders = []
        })
        .addCase(getAdminOrderDetails.pending, state => {
            state.isLoading = true
        })
        .addCase(getAdminOrderDetails.fulfilled, (state, action)  => {
            // console.log('first', action.payload)
            state.isLoading = false , 
            state.adminOrderDetails = action.payload.orderDetails
        })
        .addCase(getAdminOrderDetails.rejected, (state, action) => {
            state.isLoading = false 
            state.orderDetails = null
        })
        
    }
})


export const {resetOrderDetails} = adminOrderSlice.actions

export default adminOrderSlice.reducer