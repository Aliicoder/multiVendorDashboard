import { apiSlice } from "@/api/apiSlice"
import { formidable } from "@/utils/helpers/formidable"
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    AddCategory:builder.mutation({
      query:credentials=>{
        const formData = formidable(credentials);
        return  {
          url:'/category',
          method:'POST',
          body:formData
        }
      }
    }),
    FetchCategoriesNames:builder.mutation({
      query:()=>({
        url:'/category',
        method:'GET',
      })
    }),
    FetchCategoriesChunk:builder.mutation({
      query:credentials=>({
        url:`/category/chunk?perPage=${credentials.perPage}&&curPage=${credentials.curPage}&&searchValue=${credentials.searchValue}`,
        method:'GET',
      })
    }),

  })
})
export const {
 useFetchCategoriesNamesMutation,
 useAddCategoryMutation,
 useFetchCategoriesChunkMutation
} = categoryApiSlice