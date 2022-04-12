import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
   sort: 'rating',
   searchValue: '',
   currentPage: 1,
}

const filtersReducer = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action) {
         state.categoryId = action.payload
      },
      setSort(state, action) {
         state.sort = action.payload
      },
      setSearchValue(state, action) {
         state.searchValue = action.payload
      },
      setCurrentPage(state, action) {
         state.currentPage = action.payload
      },
      setFilters(state, action) {
         state.sort = action.payload.sort
         state.currentPage = Number(action.payload.currentPage)
         state.categoryId = Number(action.payload.categoryId)
      },
   },
})

export default filtersReducer.reducer
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } = filtersReducer.actions

export const selectSort = state => state.filters.sort
export const selectCategoryId = state => state.filters.categoryId
export const selectFilters = state => state.filters
