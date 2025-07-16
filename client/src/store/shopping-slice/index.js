import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false ,
    products: [],
    productDetails: null
}


export const  getAllFilteredProducts = createAsyncThunk(
    '/shopping/products',
    async ({filterParams, sortParams}) => {

        const query = new URLSearchParams({
            ...filterParams, 
            sortBy: sortParams
        })

        const result = await axios.get(
            `${import.meta.env.SERVER_URL}/api/shopping/products/get/?${query}`,
            {
                withCredentials:true
            }
        )
        // console.log(result, 'result')
        return result?.data
    }
)

export const getProductDetails = createAsyncThunk(
    'shopping/productDetails',
    async ({productId}) =>  {
        // console.log(productId)
        const result = await axios.get(
            `${import.meta.env.SERVER_URL}/api/shopping/products/${productId}`

        )
        
        return result?.data
    }
)



const shoppingProductSlice = createSlice({
    name: 'shopProduct', 
    initialState,
    reducers: {
        reInitializeProductDetails: (state, action) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllFilteredProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload.data
        }).addCase(getAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false
            state.products = []
        }).addCase(getProductDetails.pending, state => {
            state.isLoading = true
        }).addCase(getProductDetails.fulfilled, (state,action) => {
            // console.log(action.payload.data)
            state.isLoading = false
            state.productDetails = action.payload.data
        }).addCase(getProductDetails.rejected, (state, action) => {
            state.isLoading = false 
            state.productDetails = null
        })
    }
})

export const {reInitializeProductDetails} = shoppingProductSlice.actions

export default shoppingProductSlice.reducer