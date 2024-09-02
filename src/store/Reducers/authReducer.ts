import { RootState } from '@/store/index'
import { createSlice } from '@reduxjs/toolkit'
export interface UserParams {
  name: string
  avatar: string
  roles: number[]
}
export interface AuthStates {
  successMessage: string
  errorMessage: string
  user:UserParams 
  token:string
}
export const authReducer = createSlice({
  name: 'auth',
  initialState:{
    user:{
      name:"",
      avatar:"",
      roles:[0]
    },
    token:""
  },
  reducers:{
    setCredentials:(state,action) => {
      const { user,token } = action.payload
      console.log(action.payload)
      state.user = user
      state.token = token
    },
    logOut:(state) =>{
      state.user = {
        name:"",
        avatar:"",
        roles:[]
      }
      state.token = ""
    }
  },
})
export const {setCredentials,logOut} = authReducer.actions
export default authReducer.reducer 
export const selectCurrentUser = (state:RootState) => state.auth.user
export const selectCurrentToken = (state:RootState) => state.auth.token


// import { createSlice } from '@reduxjs/toolkit'
// import api from '@/api/api'
// export const adminLogin = createAsyncThunk(
//   'auth/adminLogin',
//   async(info,{fulfillWithValue,rejectWithValue})=>{
//     console.log(info)
//     try {
//       const { data:response } = await api.post('/adminLogin',info,{
//         withCredentials: true,
//         headers:{
//           "Content-Type": "application/json"
//         }
//       })
//       localStorage.setItem('accessToken',response.admin.accessToken)
//       return fulfillWithValue(response)
//     } catch (error:any) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// export const sellerSignup = createAsyncThunk(
//   'auth/sellerSignup',
//   async(info,{fulfillWithValue,rejectWithValue})=>{
//     console.log(info)
//     try {
//       const { data:response } = await api.post('/sellerSignup',info,{
//         withCredentials: true,
//         headers:{
//           "Content-Type": "application/json"
//         }
//       })
//       localStorage.setItem('accessToken',response.admin.accessToken)
//       return fulfillWithValue(response)
//     } catch (error:any) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// export interface AuthStates {
//   successMessage: string
//   errorMessage: string
//   loading:boolean
//   user:string
// }
// export const authReducer = createSlice({
//   name: 'auth',
//   initialState:{
//     successMessage:'',
//     errorMessage:'',
//     loading:false,
//     user:{
  
//     },
//     token:null
//   },
//   reducers:{
//     setCredentials:(state,action) => {
//       const { user,token } = action.payload
//       state.user = user
//       state.token = token
//     },
//     setErrorMessage : (state,_) => {
//       state.errorMessage = ""
//     },
//     setSuccessMessage : (state,_) => {
//       state.successMessage = ""
//     }
//   },
//   extraReducers:(builder)=> {
//     builder
//     .addCase(adminLogin.pending,(state,_)=>{
//       state.loading = true
//     })
//     .addCase(adminLogin.rejected,(state,rejectedWithValue)=>{
//       state.loading = false
//       state.errorMessage = rejectedWithValue.payload?.message
//     })
//     .addCase(adminLogin.fulfilled,(state,fulfilledWithValue)=>{
//       state.loading = false
//       state.successMessage = fulfilledWithValue.payload?.message
//     })
    
//     .addCase(sellerSignup.pending,(state,_)=>{
//       state.loading = true
//     })
//     .addCase(sellerSignup.rejected,(state,rejectedWithValue)=>{
//       state.loading = false
//       state.errorMessage = rejectedWithValue.payload?.message
//     })
//     .addCase(sellerSignup.fulfilled,(state,fulfilledWithValue)=>{
//       state.loading = false
//       state.successMessage = fulfilledWithValue.payload?.message
//     })
//   }
// })
// export const { setErrorMessage ,setSuccessMessage } = authReducer.actions
// export default authReducer.reducer 



