import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    addressList: []
}


export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/api/shopping/address/add`, 
            formData
        )

        console.log(result)

        return result?.data
    }
)

export const fetchAllAddresses = createAsyncThunk(
    'address/fetchAllAddresses',
    async(userId) => {
        const result = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/shopping/address/get/${userId}`
        )

        return result.data
    }
)

export const editAddress = createAsyncThunk(
    'address/editAddress', 
    async({userId, addressId , formData}) => {
        const result = await axios.put(
            `${import.meta.env.VITE_SERVER_URL}/api/shopping/address/edit/${userId}/${addressId}`,
            formData
        )
        return result.data
    }
)

export const deleteAddress = createAsyncThunk(
    'address/deleteAddress', 
    async ({userId, addressId }) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_SERVER_URL}/api/shopping/address/delete/${userId}/${addressId}`
        )

        return result.data

    }
)


const addressSlice = createSlice({
    name: 'address', 
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(addAddress.pending , (state) => {
            state.isLoading = true
        }).addCase(addAddress.fulfilled , (state, action) => {
            state.isLoading = false
        }).addCase(addAddress.rejected , (state) => {
            state.isLoading = false
            state.addressList = []
        }).addCase(fetchAllAddresses.pending , (state) => {
            state.isLoading = false
        }).addCase(fetchAllAddresses.fulfilled , (state, action) => {
            state.isLoading = false
            state.addressList = action.payload.data
        }).addCase(fetchAllAddresses.rejected , (state) => {
            state.isLoading = false
            state.addressList = []
        }).addCase(editAddress.pending , (state) => {
            state.isLoading = true
        }).addCase(editAddress.fulfilled , (state) => {
            state.isLoading = false
        }).addCase(editAddress.rejected , (state) => {
            state.isLoading = false
        }).addCase(deleteAddress.pending , (state) => {
            state.isLoading = true
        }).addCase(deleteAddress.fulfilled , (state, action) => {
            state.isLoading = false
            state.addressList = action.payload.data
        }).addCase(deleteAddress.rejected , (state) => {
            state.isLoading = false
        })
    }
})

export default addressSlice.reducer