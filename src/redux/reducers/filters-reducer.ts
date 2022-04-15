import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type SortType = 'rating' | 'price' | 'title'

interface FiltersPayload {
   categoryId: number,
   sortBy: SortType,
   currentPage: number,
}

interface FilterState extends FiltersPayload {
   searchValue: string,
}

const initialState: FilterState = {
   categoryId: 0,
   sortBy: 'rating',
   currentPage: 1,
   searchValue: '',
}

const filtersReducer = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId(state, action: PayloadAction<number>) {
         state.categoryId = action.payload
      },
      setSort(state, action: PayloadAction<SortType>) {
         state.sortBy = action.payload
      },
      setSearchValue(state, action: PayloadAction<string>) {
         state.searchValue = action.payload
      },
      setCurrentPage(state, action: PayloadAction<number>) {
         state.currentPage = action.payload
      },
      setFilters(state, action: PayloadAction<FiltersPayload>) {
         state.categoryId = action.payload.categoryId
         state.sortBy = action.payload.sortBy
         state.currentPage = Number(action.payload.currentPage)
      },
   },
})

export default filtersReducer.reducer
export const { setCategoryId, setSort, setSearchValue, setCurrentPage, setFilters } = filtersReducer.actions

export const selectSort = (state: RootState) => state.filters.sortBy
export const selectCategoryId = (state: RootState) => state.filters.categoryId
export const selectCurrentPage = (state: RootState) => state.filters.currentPage
export const selectFilters = (state: RootState) => state.filters
