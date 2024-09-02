import { lazy } from "react";
const AdminDashboard = lazy(()=> import("@/views/admin/AdminDashboard"))
const AdminOrders = lazy(()=> import("@/views/admin/Orders/AdminOrders"))
const AdminCategory = lazy(()=> import("@/views/admin/AdminCategory"));
const AdminSellers = lazy(()=> import("@/views/admin/Sellers/AdminSellers"));
const AdminPaymentRequests = lazy(()=> import("@/views/admin/AdminPaymentRequests"));
const AdminDeactivateSellers = lazy(()=> import("@/views/admin/AdminDeactivateSellers"));
const AdminSellerRequest = lazy(()=> import("@/views/admin/AdminSellerRequest"));
const AdminChats = lazy(()=> import("@/views/admin/AdminChats"));
const SellerDetails = lazy(()=> import("@/views/admin/Sellers/AdminSellers"));
const AdminOrderDetails = lazy(()=> import("@/views/admin/Orders/AdminOrderDetails"));
const AddCategory= lazy(()=> import("@/views/admin/AddCategory"));
export const adminRoutes = [
  {
    path:'/admin/dashboard',
    element:<AdminDashboard/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/orders',
    element:<AdminOrders/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/orders/:orderId',
    element:<AdminOrderDetails/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/category',
    element:<AdminCategory/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/category/addCategory',
    element:<AddCategory/>,
    roles:[1999]
  }, {
    path:'/admin/dashboard/sellers',
    element:<AdminSellers/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/paymentRequest',
    element:<AdminPaymentRequests/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/deactiveSellers',
    element:<AdminDeactivateSellers/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/sellerRequest',
    element:<AdminSellerRequest/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/sellerRequest/:id',
    element:<SellerDetails/>,
    roles:[1999]
  },
  {
    path:'/admin/dashboard/liveChats',
    element:<AdminChats/>,
    roles:[1999]
  }
]