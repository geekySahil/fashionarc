import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    approvalURL : null,
    orderId: null,
    orders: [],
    orderDetails: null
}


export const createOrder = createAsyncThunk(
    'shopping/orders', 
    async(createOrderData) => {
        const result = await axios.post(`${import.meta.env.SERVER_URL}/api/shopping/order/create`, 
            createOrderData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return result?.data
    }
)

export const capturePayment = createAsyncThunk(
    'shopping/capturePayment',
    async({paymentId, payerId, orderId}) => {
        const result = await axios.post(`${import.meta.env.SERVER_URL}/api/shopping/order/capture`, 
            {
                paymentId,
                payerId,
                orderId
            }
        )

        console.log('orderDetails ', result.data)
        return result?.data
    }
)

export const getAllShoppingOrders = createAsyncThunk(
    'shopping/getAllShoppingOrders',
    async(userId) => {
        const result = await axios.get(`${import.meta.env.SERVER_URL}/api/shopping/order/get/${userId}`)

        return result?.data
    }
)

export const getOrderDetails = createAsyncThunk(
    'shopping/getOrderDetails',
    async(orderId) => {
        const result = await axios.get(`${import.meta.env.SERVER_URL}/api/shopping/order/details/${orderId}`)

        return result?.data
    }
)


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, state => {
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state, action)  => {
            state.isLoading = false , 
            state.approvalURL = action.payload.approvalURL
            state.orderId  = action.payload.orderId
            console.log('action.payload.orderId',  action.payload.orderId)
            sessionStorage.setItem('confirmOrderId', action.payload.orderId)
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false 
            state.approvalURL = null,
            state.orderId = null
        })
        .addCase(getAllShoppingOrders.pending, state => {
            state.isLoading = true
        })
        .addCase(getAllShoppingOrders.fulfilled, (state, action)  => {
            // console.log('first', action.payload)
            state.isLoading = false , 
            state.orders = action.payload.data
        })
        .addCase(getAllShoppingOrders.rejected, (state, action) => {
            state.isLoading = false 
            state.orders = []
        }) .addCase(getOrderDetails.pending, state => {
            state.isLoading = true
        })
        .addCase(getOrderDetails.fulfilled, (state, action)  => {
            console.log('first', action.payload)
            state.isLoading = false , 
            state.orderDetails = action.payload.orderDetails
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
            state.isLoading = false 
            state.orderDetails = null
        })
        // .addCase(capturePayment.pending, state => {
        //     state.isLoading = true
        // })
        // .addCase(capturePayment.fulfilled, (state, action)  => {
        //     state.isLoading = false , 
        //     state.approvalURL = action.payload.approvalURL
        //     state.orderId  = action.payload.orderId
        // })
        // .addCase(capturePayment.rejected, (state, action) => {
        //     state.isLoading = false 
        //     state.approvalURL = null,
        //     state.orderId = null
        // })
    }
})


export const {resetOrderDetails} = orderSlice.actions

export default orderSlice.reducer