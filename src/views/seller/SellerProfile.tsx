
import { Link, Outlet, useLocation } from "react-router-dom";
import sellerProfileNavs from "@/navagtion/SellerProfileNavs/sellerProfileNavs";
const IsActive = (path:string,segment:string):boolean=>{
  const regex = new RegExp(segment, "g");
  return regex.test(path)
}
function SellerProfile() {
  let { pathname } = useLocation();  
  return (
    <div className='montserrat cp-3_10  w-full h-full bg-slate-50'>
      <h1 className='c5 cp-3_10'>Account Settings</h1>
      <div className='flex cp-3_10 gap-3'>
      <div className='flex flex-col w-2/12 ' >
          {
            sellerProfileNavs.map(nav =>{
              const active = IsActive(pathname,nav.link)
              console.log(active)
              return (
                <Link key={nav.title} to={nav.link} className={`flex ch-70 bg-slate-50 items-center 
                  ${active ? "border-r !bg-white":""}`}>
                      <div className='flex p-2 justify-center items-center h-full scale-50 aspect-square  rounded-full'>
                        {nav.icon}
                      </div>
                      <h1 className='c2 '>{nav.title}</h1>
                  </Link>
              )
            })
          }
         
      </div>
        <Outlet />
      </div>
    </div>
  )
}

export default SellerProfile

