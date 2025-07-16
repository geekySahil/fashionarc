import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    products: [],
    isLoading: false
}


export const addNewProduct = createAsyncThunk(
    '/products/add',

    async(formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/products/add`,
            formData, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        // console.log('result', result)

        return result?.data
    }
)

export const getAllProducts = createAsyncThunk(
    '/products/all-products',

    async() => {
        const result = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/products/get`,
           
        )
        
        
        return result?.data
    }
)

export const editProductDetails = createAsyncThunk(
    '/products/edit',

    async({formData, id}) => {
        const result = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/products/edit/${id}`,
            formData, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        return result?.data
    }
)

export const removeProduct = createAsyncThunk(
    '/products/edit',

    async(id) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/products/delete/${id}`
        )

        return result.data
    }
)





const productSlice = createSlice({
    name: 'product',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending , (state) => {
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled , (state , action) => {
            state.isLoading = false,
            state.products = action.payload?.data
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false
            state.products = []
        })
    }
})

export default productSlice.reducer