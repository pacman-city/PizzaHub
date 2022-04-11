import { configureStore } from '@reduxjs/toolkit'
import filter from './reducers/filter-reducer'

export const store = configureStore({
   reducer: { filter },
})
