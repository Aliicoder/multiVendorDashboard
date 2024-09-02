import { apiSlice } from "@/api/apiSlice"
import { formidable } from "@/utils/helpers/formidable"
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    refresh:builder.mutation({
      query:credentials=>({
        url:"/refresh",
        method:'GET',
      })
    }),
    sellerLogin:builder.mutation({
      query:credentials=>({
        url:'/seller/login',
        method: 'POST',
        body:{...credentials}
      })
    }),
    adminLogin:builder.mutation({
      query:credentials=>({
        url:'/admin/login',
        method: 'POST',
        body:{...credentials}
      })
    }),
    signup:builder.mutation({
      query:credentials=>({
        url:'/seller/signup',
        method:'POST',
        body:{...credentials}
      })
    }), 

  })
})
export const {
 useSellerLoginMutation,
 useSignupMutation,
 useAdminLoginMutation,
 useRefreshMutation,
} = authApiSlice