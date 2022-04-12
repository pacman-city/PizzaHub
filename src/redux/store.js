import { configureStore } from '@reduxjs/toolkit'
import filters from './reducers/filters-reducer'
import cart from './reducers/cart-reducer'
import products from './reducers/products-reducer'

export const store = configureStore({
   reducer: { filters, cart, products },
})
