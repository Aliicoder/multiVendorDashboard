import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { lazy, useEffect, useState } from "react"
import { useRefreshMutation } from "@/store/Reducers/authApiSlice"
import ConditionalLoader from "@/components/conditionals/ConditionalLoader"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/store/Reducers/authReducer"
const Header = lazy(()=> import("@/layout/Header"))
const SideBar = lazy(()=> import("@/layout/SideBar"))
function MainLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log()
  const [refresh] = useRefreshMutation();
  const [isLoading,setIsLoading] = useState(true)
  const [showSidebar,setShowSidebar] = useState(false)
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/"
  console.log(from)
  const handleCloseSideBar = () =>{
    if(showSidebar)
      setShowSidebar(false)
  }
  useEffect(()=>{
    const persistLogin = async () =>{
      try {
        const data = await refresh({}).unwrap();
        console.log(data)
        dispatch(setCredentials(data.credentials))
      }catch(error){
        toast.error("please login first")
        navigate("/")
      }finally{
        setIsLoading(false)
      }
    }
    persistLogin()
  },[])
  return (
    <div className="relative flex h-svh overflow-hidden">
     {
      isLoading ?
      <ConditionalLoader condition={isLoading} />
      : 
      <>
        <SideBar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <div onClick={handleCloseSideBar} className="flex flex-col w-full">
          <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          <Outlet/>
        </div>
      </>
     }
    </div>
  )
}

export default MainLayout


