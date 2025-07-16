import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false, 
    reviewsList : []
}


export const addReview = createAsyncThunk(
    '/review/addReview', 

    async(formData) => {
        const result = await axios.post(
            `${import.meta.env.SERVER_URL}/api/shopping/review/add`,
            formData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        )

        return result?.data
    }
)


export const getAllReviews = createAsyncThunk(
    '/review/getAllReviews', 

    async(productId) => {
        const result = await axios.get(
            `${import.meta.env.SERVER_URL}/api/shopping/review/${productId}`,
        )

        return result?.data
    }
)

const reviewSlice = createSlice({
    name: 'review', 
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(getAllReviews.pending, (state) => {
            state.isLoading = true
        }).addCase(getAllReviews.fulfilled, (state, action) => {
            // console.log('action payload ', action.payload)
            state.isLoading = false, 
            state.reviewsList = action.payload?.data
        }).addCase(getAllReviews.rejected, (state, action) => {
            state.isLoading = false, 
            state.reviewsList = []
        })
    }
    
})

export default reviewSlice.reducer