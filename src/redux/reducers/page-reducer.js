import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   currentPage: 1,
}

const pageReducer = createSlice({
   name: 'page',
   initialState,
   reducers: {
      setCurrentPage(state, action) {
         state.currentPage = action.payload
      },
   },
})

export const { setCurrentPage } = pageReducer.actions
export default pageReducer.reducer
