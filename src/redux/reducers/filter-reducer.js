import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
   sort: 'rating',
   searchValue: '',
   currentPage: 1,
}

const filterReducer = createSlice({
   name: 'filter',
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

export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } = filterReducer.actions
export default filterReducer.reducer
