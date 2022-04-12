import { configureStore } from '@reduxjs/toolkit'
import filter from './reducers/filter-reducer'
import cart from './reducers/cart-reducer'

export const store = configureStore({
   reducer: { filter, cart },
})
