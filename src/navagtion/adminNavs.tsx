import { MdOutlinePayment } from "react-icons/md";
import { MdChatBubbleOutline } from "react-icons/md";
import { VscDashboard } from "react-icons/vsc";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { HiMiniUsers } from "react-icons/hi2";
import { FaUsersSlash } from "react-icons/fa6";
import { FiGitPullRequest } from "react-icons/fi";

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
    link:"/admin/dashboard"
  },
  {
    id:2,
    title:"Orders",
    icon:<LuShoppingCart />,
    link:"/admin/dashboard/orders"
  },
  {
    id:3,
    title:"Category",
    icon:<MdOutlineDashboardCustomize />,
    link:"/admin/dashboard/category"
  },
  {
    id:4,
    title:"Sellers",
    icon:<HiMiniUsers />,
    link:"/admin/dashboard/sellers"
  },
  {
    id:5,
    title:"Payment Request",
    icon:<MdOutlinePayment />,
    link:"/admin/dashboard/paymentRequest"
  },
  {
    id:6,
    title:"Deactive Sellers",
    icon:<FaUsersSlash />,
    link:"/admin/dashboard/deactiveSellers"
  },
  {
    id:7,
    title:"Seller Request",
    icon:<FiGitPullRequest />,
    link:"/admin/dashboard/sellerRequest"
  },
  {
    id:8,
    title:"Live chats",
    icon:<MdChatBubbleOutline />,
    link:"/admin/dashboard/liveChats"
  }
]
export default adminNavs