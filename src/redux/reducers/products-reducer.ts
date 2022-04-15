import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Product = {
   id: string,
   imageUrl: string,
   title: string,
   types: number[],
   sizes: number[],
   price: number,
   category: number,
   rating: number
}

enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error'
}

interface ProductsState {
   items: Product[],
   status: Status
}

// createAsyncThunk<ReturnTYPE, ArgumentType>
export const fetchProducts = createAsyncThunk<Product[], string>(
   'psoducts/fetchProducts',
   async (urlParams) => {
      const { data } = await axios.get<Product[]>(`https://63481a210484786c6e91d7a6.mockapi.io/items?${urlParams}`)
      return data
   },
)

const initialState: ProductsState = {
   items: [],
   status: Status.LOADING,
}

const ProductsReducer = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.status = Status.LOADING
         state.items = []
      })
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.items = action.payload
         state.status = Status.SUCCESS
      })
      builder.addCase(fetchProducts.rejected, (state) => {
         state.status = Status.ERROR
         state.items = []
      })
   },
})
// extraReducers: {
//    [fetchProducts.pending]: state => {
//       state.status = 'loading'
//       state.items = []
//    },
//    [fetchProducts.fulfilled]: (state, action) => {
//       state.items = action.payload
//       state.status = 'success'
//    },
//    [fetchProducts.rejected]: state => {
//       state.status = 'error'
//       state.items = []
//    },
// },

export default ProductsReducer.reducer

export const selectProducts = (state: RootState) => state.products
