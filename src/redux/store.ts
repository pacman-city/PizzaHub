import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import filters from './reducers/filters-reducer'
import cart from './reducers/cart-reducer'
import products from './reducers/products-reducer'

export const store = configureStore({
   reducer: {
      filters,
      cart,
      products,
   },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()