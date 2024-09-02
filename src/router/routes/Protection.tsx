import { selectCurrentToken, selectCurrentUser } from "@/store/Reducers/authReducer"
import { PropsWithChildren, Suspense } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

interface AllowedRolesParams extends PropsWithChildren {
  allowedRoles: number[]
}
function Protection({allowedRoles,children}:AllowedRolesParams) {
  
  const location = useLocation()
  const user = useSelector(selectCurrentUser)
  const root  = location.pathname.split('/')[1]
  const userRole = user?.roles[0] as number
  const token = useSelector(selectCurrentToken)
  const isAllowed = allowedRoles.includes(userRole) ? true : false
  console.log(isAllowed)
  console.log(token)
  if(isAllowed && token )
    return <Suspense fallback={null}>
            {children}
           </Suspense>
  return <Navigate to={`/${root}/login`} state={{from:location}} replace/>
}

export default Protection