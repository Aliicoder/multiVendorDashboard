import MainLayout from "@/layout/MainLayout"
import { privateRoutes } from "./privateRoutes"
import Protection from "./Protection"

export const getPrivateRoutes = () => {
  privateRoutes.map(route => {
    //console.log(route)
    route.element = <Protection allowedRoles={route.roles}>
                      {route.element}
                    </Protection>
  }
)
  return {
    path:'/',
    element:<MainLayout/>,
    children:privateRoutes
  }
}