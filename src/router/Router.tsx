import { useRoutes } from 'react-router-dom'
function Router({allRoutes}:any) {
  const routes = useRoutes([...allRoutes])
  return routes
}

export default Router