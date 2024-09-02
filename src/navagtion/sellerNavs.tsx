import { VscDashboard } from "react-icons/vsc";
import { AiFillProduct } from "react-icons/ai";
import { MdChatBubbleOutline, MdPayment } from "react-icons/md";
import { RiChatSettingsLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { BiCartAlt } from "react-icons/bi";
export interface NavsParams {
  id: number
  title: string
  icon: JSX.Element
  link: string
}
const adminNavs = [
  {
    id:1,
    title:"Dashboard",
    icon:<VscDashboard />,
    link:"/seller/dashboard"
  },{
    id:2,
    title:"Products",
    icon:<AiFillProduct />,
    link:"/seller/dashboard/products"
  },{
    id:2,
    title:"Orders",
    icon:<BiCartAlt />,
    link:"/seller/dashboard/orders"
  },{
    id:3,
    title:"Payments",
    icon:<MdPayment />,
    link:"/seller/dashboard/payments"
  },{
    id:4,
    title:"Admins Chats",
    icon:<RiChatSettingsLine />,
    link:"/seller/dashboard/adminsChats"
  },{
    id:5,
    title:"Customer Support",
    icon:<MdChatBubbleOutline />,
    link:"/seller/dashboard/customerSupport"
  },{
    id:6,
    title:"Profile",
    icon:<IoSettingsSharp />,
    link:"/seller/dashboard/profile/details"
  },
]
export default adminNavs