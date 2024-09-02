import { Counter } from "@/utils/types/types"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

interface PaginationParams{
  onLeftClick:()=>void
  onRightClick:()=>void
  counter:Counter
}
function Pagination({counter,onLeftClick,onRightClick}:PaginationParams) {
  return (
    <div className="flex c3 mt-3 justify-center bg-slate-100 gap-3 p-3">
      <div className="flex items-center gap-3">
          <div onClick={onLeftClick}>
            <FaAngleLeft />
          </div>
          <ul className="flex gap-3">
            {counter.curr <= 1 ?<li></li>:<li>{counter.prev}</li>}
            <li className="font-semibold">{counter.curr}</li>
            {counter.curr >= counter.max?<li></li>:<li>{counter.next}</li> }
          </ul>
          <div onClick={onRightClick}>
            <FaAngleRight />
          </div>
      </div>
    </div>
  )
}

export default Pagination