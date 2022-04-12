import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('psoducts/fetchProducts', async urlParams => {
   const { data } = await axios.get(`https://63481a210484786c6e91d7a6.mockapi.io/items?${urlParams}`)
   return data
})

const initialState = {
   items: [],
   status: 'loading',
}

const ProductsReducer = createSlice({
   name: 'products',
   initialState,
   extraReducers: {
      [fetchProducts.pending]: state => {
         state.status = 'loading'
         state.items = []
      },
      [fetchProducts.fulfilled]: (state, action) => {
         state.items = action.payload
         state.status = 'success'
      },
      [fetchProducts.rejected]: state => {
         state.status = 'error'
         state.items = []
      },
   },
})

export default ProductsReducer.reducer

export const selectProducts = state => state.products
