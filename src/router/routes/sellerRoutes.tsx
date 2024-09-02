import SellerOrderDetails from "@/views/seller/SellerOrderDetails";
import SellerOrders from "@/views/seller/SellerOrders";
import SellerProductDetails from "@/views/seller/SellerProductDetails";
import SellerProfileDetails from "@/views/seller/SellerProfileDetails";
import SellerProfilePassword from "@/views/seller/SellerProfilePassword";
import { lazy } from "react";
const SellerDashboard = lazy(()=> import("@/views/seller/SellerDashboard"));
const SellerProducts = lazy(()=> import("@/views/seller/products/SellerProducts"));
const AddProduct = lazy(()=> import("@/views/seller/products/AddProduct"));
const ProductEdit = lazy(()=> import("@/views/seller/products/ProductEdit"));
const SellerPayments = lazy(()=> import("@/views/seller/SellerPayments"));
const SellerCustomerSupport = lazy(()=> import("@/views/seller/SellerCustomerSupport"));
const SellerAdminsChats = lazy(() => import("@/views/seller/SellerAdminsChats"));
const SellerProfile = lazy(()=> import("@/views/seller/SellerProfile"));
export const sellerRoutes = [
  {
    path:'/seller/dashboard',
    element:<SellerDashboard/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/orders',
    element:<SellerOrders/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/orders/:orderId',
    element:<SellerOrderDetails/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/products',
    element:<SellerProducts/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/products/:productId',
    element:<SellerProductDetails/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/products/addProduct',
    element:<AddProduct/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/products/edit/:productId',
    element:<ProductEdit/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/payments',
    element:<SellerPayments/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/adminsChats',
    element:<SellerAdminsChats/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/customerSupport',
    element:<SellerCustomerSupport/>,
    roles:[2000,1999]
  },{
    path:'/seller/dashboard/profile',
    element:<SellerProfile/>,
    roles:[2000,1999],
    children:[
      {
        path:'/seller/dashboard/profile/details',
        element:<SellerProfileDetails/>,
        roles:[2000,1999]
      },{
        path:'/seller/dashboard/profile/password',
        element:<SellerProfilePassword/>,
        roles:[2000,1999]
      }
    ]
  }
]