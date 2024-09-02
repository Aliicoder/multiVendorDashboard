import { apiSlice } from "@/api/apiSlice"
import authReducer from "./Reducers/authReducer"
import  categoryReducer  from "./Reducers/categorySlice"
const rootReducer = {
  [apiSlice.reducerPath]:apiSlice.reducer,
  auth:authReducer,
  category:categoryReducer
}
export default rootReducer