import { lazy } from "react";
import { RouteObject } from "react-router-dom";
const LoginPage= lazy(()=> import("@/views/auth/LoginPage"))
const SignupPage = lazy(()=> import("@/views/auth/SignupPage"))
const AdminLoginPage = lazy(()=> import("@/views/auth/AdminLoginPage"))
const publicRoutes:RouteObject[] = [
  {
    path:'/seller/login',
    element:<LoginPage/>
  },{
    path:'seller/signup',
    element:<SignupPage/>
  },{
    path:"/admin/login",
    element:<AdminLoginPage/>
  }
]
export default publicRoutes 