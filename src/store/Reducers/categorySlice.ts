import { RootState } from '@/store/index'
import { createSlice } from '@reduxjs/toolkit'
export interface UserParams {
  categories: string[]
}
export const categoryReducer = createSlice({
  name: 'category',
  initialState:{
    categories:[]
  },
  reducers:{
    setCategories:(state,action) => {
      const  categories  = action.payload
      console.log(action.payload)
      state.categories = categories
    },
  },
})
export const {setCategories} = categoryReducer.actions
export default categoryReducer.reducer 
export const selectCurrentCategories = (state:RootState) => state.category.categories
export const selectCurrentToken = (state:RootState) => state.auth.token