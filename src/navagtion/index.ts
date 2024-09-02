import adminNavs from "./adminNavs"
import sellerNavs from "./sellerNavs"
type Role = number
const getNavs = (role:Role) =>{
  if(role === 1999 )
    return adminNavs
  if(role === 2000)
    return sellerNavs
}
export default getNavs