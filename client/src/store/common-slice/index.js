import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false, 
    featuredImagesList : []
}


export const getFeatureImages = createAsyncThunk(
    '/feature/get', 

    async() => {
        const result = await axios.get(
            `${import.meta.env.SERVER_URL}/api/common/feature/get`

        )

        return result?.data
    }
)

export const addFeatureImage = createAsyncThunk(
    '/feature/add', 

    async(image) => {
        const result = await axios.post(
            `${import.meta.env.SERVER_URL}/api/common/feature/add`,
            {image},
            // {
            //     headers:{
            //         'Content-Type' : 'application/json'
            //     }
            // }
        )

        return result?.data
    }
)

export const deleteFeatureImage = createAsyncThunk(
    '/feature/delete', 

    async(imageId) => {
        const result = await axios.delete(
            `${import.meta.env.SERVER_URL}/api/common/feature/${imageId}`
        )

        return result?.data
    }
)

const commonSlice = createSlice({
    name: 'feature', 
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true
        }).addCase(getFeatureImages.fulfilled, (state, action) => {
            console.log('action payload ', action.payload)
            state.isLoading = false, 
            state.featuredImagesList = action.payload?.data
        }).addCase(getFeatureImages.rejected, (state, action) => {
            state.isLoading = false, 
            state.featuredImagesList = []
        })
    }
    
})

export default commonSlice.reducer