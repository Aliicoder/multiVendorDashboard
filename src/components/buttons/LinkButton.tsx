import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
interface LinkButtonParams extends PropsWithChildren {
  to:string
  text?:string
  className?:string
}
function LinkButton({children,className,text,to}:LinkButtonParams) {
  return (
    <div className='flex cp-5 justify-center items-center'>
      <Link to={to} className={`${className} flex items-center cp-2 gap-2 text-white  ${text ? "c2":"c3"} bg-slate-950 ${text? "cp-10" : "cp-6"} rounded-md`}>
        {text&&<span>{text}</span>}
        {children}
      </Link>
    </div>
  )
}

export default LinkButton