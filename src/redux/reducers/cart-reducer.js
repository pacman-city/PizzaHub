import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   items: [],
   totalPrice: 0,
   totalCount: 0,
}

const CartReducer = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action) {
         const findItem = state.items.find(obj => obj.id === action.payload.id)

         if (findItem) findItem.count++
         else state.items.push({ ...action.payload, count: 1 })

         state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)

         state.totalCount++
      },
      minusItem(state, action) {
         const findItem = state.items.find(obj => obj.id === action.payload)
         if (findItem) findItem.count--
         state.totalCount--
      },
      removeItem(state, action) {
         state.items = state.items.filter(obj => obj.id !== action.payload)
         state.totalCount = state.items.reduce((sum, { count }) => sum + count, 0)
         state.totalPrice = state.items.reduce((sum, { price, count }) => sum + price * count, 0)
      },
      clearCart(state) {
         state.items = []
         state.totalCount = 0
         state.totalPrice = 0
      },
   },
})

export default CartReducer.reducer
export const { addItem, removeItem, minusItem, clearCart } = CartReducer.actions

export const selectCart = state => state.cart
export const selectCartItem = id => state => state.cart.items.find(obj => obj.id === id)
