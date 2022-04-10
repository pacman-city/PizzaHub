import { configureStore } from '@reduxjs/toolkit'
import filter from './reducers/filter-reducer'
import page from './reducers/page-reducer'

export const store = configureStore({
   reducer: { filter, page },
})
