import { MdOutlineNotificationsActive,MdSecurity } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { GoVerified } from "react-icons/go";
export interface NavsParams {
  id: number
  title: string
  icon: JSX.Element
  link: string
}
const sellerProfileNavs = [
  {
    id:1,
    title:"Profile Settings",
    icon:<IoPersonOutline className="c2 h-full w-full"/>,
    link:"details"
  },{
    id:2,
    title:"Password",
    icon:<MdSecurity className="c2 h-full w-full"/>,
    link:"password"
  },{
    id:3,
    title:"Notifications",
    icon:<MdOutlineNotificationsActive className="c2 h-full w-full"/>,
    link:"notifications"
  },{
    id:4,
    title:"Verification",
    icon:<GoVerified className="c2 h-full w-full"/>,
    link:"verification"
  }
]
export default sellerProfileNavs 