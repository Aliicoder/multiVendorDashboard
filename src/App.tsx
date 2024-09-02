import { useEffect, useState } from "react"
import Router from "./router/Router"
import publicRoutes from "./router/routes/publicRoutes"
import { getPrivateRoutes } from "./router/routes"

function App() {
  const [allRoutes,setAllRoutes] = useState([...publicRoutes])
  useEffect(() =>{
    const privateRoutes = getPrivateRoutes()
    setAllRoutes((prev)=>{
      return [...prev,privateRoutes]
    })
   
  },[])
  return <Router allRoutes={allRoutes} />
}

export default App