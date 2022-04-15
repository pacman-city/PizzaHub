import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type CartItem = {
   id: string,
   title: string,
   price: number,
   imageUrl: string,
   type: string,
   size: number,
}

interface StateCartItem extends CartItem {
   count: number
}

interface CartState {
   items: StateCartItem[],
   totalPrice: number,
   totalCount: number
}

const initialState: CartState = {
   items: [],
   totalPrice: 0,
   totalCount: 0,
}

const CartReducer = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<CartItem>) {
         const findItem = state.items.find(obj => obj.id === action.payload.id)

         if (!findItem) state.items.push({ ...action.payload, count: 1 })
         else findItem.count++

         state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)

         state.totalCount++
      },
      minusItem(state, action: PayloadAction<string>) {
         const findItem = state.items.find(obj => obj.id === action.payload)
         if (findItem) findItem.count--
         state.totalCount--
      },
      removeItem(state, action: PayloadAction<string>) {
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

export const selectCart = (state: RootState) => state.cart
export const selectCartItem = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)
