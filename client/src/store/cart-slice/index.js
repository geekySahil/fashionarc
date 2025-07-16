import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


const initialState = {
    isLoading: false,
    cartItems: [],
    cartId: null
}


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async({userId, productId, quantity}) => {
        const result = await axios.post(
            `${import.meta.env.SERVER_URL}/api/shopping/cart/add`,
            {
                userId, 
                productId, 
                quantity
            }
        )

        return result?.data

    }
)

export const fetchAllCartItems = createAsyncThunk(
    'cart/fetchAllCartItems',
    async({userId}) => {
        const result = await axios.get(
            `${import.meta.env.SERVER_URL}/api/shopping/cart/get/${userId}`,
        )

        return result?.data

    }
)

export const updateCartItemsQty = createAsyncThunk(
    'cart/updateCartItemsQty',
    async({userId, productId, quantity}) => {
        const result = await axios.put(
            `${import.meta.env.SERVER_URL}/api/shopping/cart/update`,
            {
                userId, 
                productId, 
                quantity
            }
        )


        return result?.data



    }
)

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async({userId, productId}) => {
        const result = await axios.delete(
            `${import.meta.env.SERVER_URL}/api/shopping/cart/${userId}/${productId}`,
        )

        return result?.data

    }
)


const cartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // .addCase(addToCart.pending , (state,action) => {
        //     state.isLoading = false
        // }).addCase(addToCart.fulfilled , (state,action) => {
        //     state.isLoading = false
        //     state.cartItems = action.payload.data
        // }).addCase(addToCart.rejected , (state,action) => {
        //     state.isLoading = false
        //     state.cartItems = []
        // })
        .addCase(fetchAllCartItems.pending , (state,action) => {
            state.isLoading = true
        }).addCase(fetchAllCartItems.fulfilled , (state,action) => {
            // console.log(action.payload)
            state.isLoading = false
            state.cartItems = action.payload.data?.items
            state.cartId = action.payload.data?._id
        }).addCase(fetchAllCartItems.rejected , (state,action) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(updateCartItemsQty.pending , (state,action) => {
            state.isLoading = true
        }).addCase(updateCartItemsQty.fulfilled , (state,action) => {
            if(action.payload.data){
                state.isLoading = false
                state.cartItems = action.payload.data?.items
                state.cartId = action.payload.data?._id
            }else{
                state.isLoading = false
            }
            
        }).addCase(updateCartItemsQty.rejected , (state,action) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(deleteCartItem.pending , (state,action) => {
            state.isLoading = false
        }).addCase(deleteCartItem.fulfilled , (state,action) => {
            state.isLoading = false
            state.cartItems = action.payload.data.items
        }).addCase(deleteCartItem.rejected , (state,action) => {
            state.isLoading = false
            state.cartItems = []
        })
    }
})

export default cartSlice.reducer