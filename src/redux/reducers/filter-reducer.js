import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   categoryId: 0,
   sort: 'rating',
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
   },
})

export const { setCategoryId, setSort } = filterReducer.actions
export default filterReducer.reducer
