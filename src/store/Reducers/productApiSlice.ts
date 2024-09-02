import { apiSlice } from "@/api/apiSlice"
import { formidable } from "@/utils/helpers/formidable"
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({

    AddProduct:builder.mutation({
      query:credentials=>{
        const formData = formidable(credentials);
        return{
          url:'/product',
          method:'POST',
          body: formData
        }
      }
    }),
    FetchCategoriesNames:builder.mutation({
      query:()=>({
        url:'/product',
        method:'GET',
      })
    }),
    FetchProductsChunk:builder.mutation({
      query:credentials=>({
        url:`/product/chunk?perPage=${credentials.perPage}&&curPage=${credentials.curPage}&&searchValue=${credentials.searchValue}`,
        method:'GET',
      })
    }),
    FetchProduct:builder.mutation({
      query:credentials=>{console.log("FetchProduct credentials>>",credentials)
        return{
          url:`/product?productId=${credentials.productId}`,
          method:'GET',
        }
      }  
    })
  })
})
export const {
 useAddProductMutation,
 useFetchCategoriesNamesMutation,
 useFetchProductsChunkMutation,
 useFetchProductMutation
} = productApiSlice