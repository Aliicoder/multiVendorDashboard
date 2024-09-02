import getNavs from '@/navagtion'
import { NavsParams } from '@/navagtion/adminNavs'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setCredentials } from '@/store/Reducers/authReducer';
interface SidebarParams {
  setShowSidebar:  ()=> boolean
  showSidebar: boolean
}
function SideBar({showSidebar,setShowSidebar}:SidebarParams) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  let { pathname } = useLocation()
  const [navigations,setNavigations] = useState<NavsParams[]|undefined>()
  useEffect(() =>{ 
    const list = getNavs(user?.roles[0])
    setNavigations(list)
  },[]) ; //console.log("pathname>>",pathname)
  if(pathname == "/")
    pathname = "/base"
  const url = pathname.split("/") ; //console.log("url>>",url)
  let segments:string[] = []
  for(let i = 1; i <=3 ; i++) {
    segments.push(url[i])    
  }
  const regex = segments.join("/") ; //console.log("regex>>",regex)
  const root = new RegExp(regex) ;  //console.log("root>>",root)
  const handleLogOut = () =>{
    dispatch(setCredentials({user:null,token:null})) //! should redirect automatically delete it after
    navigate("/seller/login")
  }
  return (
    <div className={`${showSidebar? "min-w-[200px] h-svh bg-white z-10" : "w-0 lg:w-[360px]"}  transition-all overflow-hidden border`} >
      <div className='flex  justify-center items-center c6 montserrat  font-semibold  min-h-16 lg:min-h-24'>
        <h1> souq <span className='text-blue-600'>.</span> </h1>
      </div>
      <ul>
        {
          navigations?.map((nav:NavsParams,i)=>{ 
            const active = root.test(nav.link) ; //console.log("nav.link>>",nav.link) ; //console.log("active>>",active);   
            return <li className='' key={i}>
              <Link className={`
                ${ active ? "border-r translate-x-5  bg-slate-50":""}
                transition-all flex montserrat items-center gap-3  mx-5 my-6 p-3 `} 
                to={nav.link} key={nav.id} >
                {nav.icon} <h3 className={`${active ? "translate-x-2":""} c3 font-medium`}>{nav.title}</h3>
              </Link>
            </li>
          })
        }
        <li className=''>
          <button onClick={handleLogOut} className={`flex montserrat items-center gap-3 rounded-md mx-5 my-12 p-3 `}  >
            <TbLogout2 /><h3 className='c3 font-medium'>Log Out</h3>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SideBar