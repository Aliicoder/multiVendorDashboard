import { BarLoader } from "react-spinners"
const overrideCss = {
  position: "absolute",
  height: "2px",
  top: "0",
  left : "0" ,
  width: "100%",
}
type ConditionParams = {
  condition: boolean
}
const ConditionalLoader = ({condition}:ConditionParams) => {
  return ( 
    <>
      {condition&&<BarLoader cssOverride={overrideCss}/>}
    </>
   );
}
 
export default ConditionalLoader;