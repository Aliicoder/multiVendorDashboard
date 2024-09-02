import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { useSelector } from "react-redux";
import { motion } from "framer-motion"
interface SidebarParams {
  setShowSidebar:  ()=> boolean
  showSidebar: boolean
}
function Header({setShowSidebar,showSidebar}:SidebarParams) {
  const [showSearchBar,setShowSearchBar] = useState(true)
  const user = useSelector(selectCurrentUser)
  const role = user.roles[0] 
  const handleSearchBar = () =>{
    setShowSearchBar(!showSearchBar)
  }
  const handleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  useEffect(() =>{
  },[])
  return (
    <div className='flex justify-between min-h-16 lg:min-h-24 border-b  border-l-white translate-x-1'>
      <div className='flex relative items-center gap-4 cp-l-100 '>
        <motion.input 
          placeholder='Search ' 
          
          className={`
           max-w-[300px] px-5 py-2 }
          c3  rounded-lg bg-slate-100 transition-all  focus:border outline-none  `} type="text" />
        <div className="c3 absolute right-2 bg-slate-100 border-l scale-125 ">
          <CiSearch onClick={handleSearchBar} className="m-1 cursor-pointer"/>
        </div>
      </div>
      <div className='flex items-center px-5 gap-5'>
        <div className='flex flex-col text-right'>
          <h1 className='c2 font-medium' >{user.name}</h1>
          <h1 className='c2' >{role == 1999 ?"admin":(role == 2000 ?"seller":"")}</h1>
        </div>
        <div className="max-w-8 aspect-square  rounded-full  overflow-hidden">
          <img src="/images/img2.jpg" className='w-full object-contain' alt="" />
        </div>
        <div onClick={handleSidebar} className="flex justify-center items-center h-8 w-8 lg:hidden">
          <CiMenuFries />
        </div>
      </div>
    </div>
  )
}

export default Header