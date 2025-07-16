import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false, 
    searchedProductsList : []
}


export const searchProducts = createAsyncThunk(
    '/product/search', 

    async(searchQuery) => {
        const result = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/shopping/products/search/${searchQuery}`

        )

        return result?.data
    }
)

const searchSlice = createSlice({
    name: 'search', 
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.isLoading = true
        }).addCase(searchProducts.fulfilled, (state, action) => {
            console.log('action payload ', action.payload)
            state.isLoading = false, 
            state.searchedProductsList = action.payload?.data
        }).addCase(searchProducts.rejected, (state, action) => {
            state.isLoading = false, 
            state.searchedProductsList = []
        })
    }
    
})

export default searchSlice.reducer