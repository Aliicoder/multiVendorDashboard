import { forwardRef } from "react"
import { CiSearch } from "react-icons/ci"
import { FixedSizeList as List } from "react-window"
function handleOnWheel({deltaY}){
  console.log("handleOnWhell",deltaY)
}
const outerElementType = forwardRef((props,ref)=>{
  return <div ref={ref} onWheel={handleOnWheel} {...props}/>
})
function AdminPaymentRequests() {

  const Rows = ({index,style}) =>{
    return (
      <div style={style} className="c3 flex even:bg-slate-100">
        <div className="w-1/5 text-center cp-5">{index+1}</div>
        <div className="w-1/5 text-center cp-5 truncate ">300$</div>
        <div className="w-1/5 text-center cp-5 truncate">Pending</div>
        <div className="w-1/5 text-center cp-5 truncate">13 Jun 2024</div>
        <div className="w-1/5 text-center cp-5  truncate flex justify-center   gap-3">
          <button className="text-white c2 cp-x-2_5 cp-y-1_4 rounded-md bg-slate-900">
            Confirm
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap rounded-md bg-slate-50 h-full">       
        <div className='w-full   bg-slate-50'>
        <div className=" flex justify-between cp-3_10">
          <h1 className="montserrat font-semibold cp-5 cp-l-100">withdraw requests</h1>
          <div className='flex relative overflow-hidden items-center gap-4 ml-10 '>
            <input placeholder='Search for request ' 
            className={`
                  max-w-[300px] px-5 py-2
              c3  rounded-lg bg-slate-100 transition-all  outline-none  `} type="text" />
            <div className="absolute h-full flex justify-center items-center cp-5 right-0 bg-slate-100 border-l">
              <CiSearch className="m-1 aspect-square cursor-pointer"/>
            </div>
          </div>
        </div>
        <div>
          <div className="flex">
            <div className="w-1/5 font-semibold c4 text-center cp-10">No</div>
            <div className="w-1/5 font-semibold c4 text-center cp-10">Amount</div>
            <div className="w-1/5 font-semibold c4 text-center cp-10">Status</div>
            <div className="w-1/5 font-semibold c4 text-center cp-10">Date</div>
            <div className="w-1/5 font-semibold c4 text-center cp-10">Action</div>
          </div>
          {
            <List 
            className="List"
            style={{width: '100%'}}
            height={500}  
            itemSize={33}
            itemCount={10}
            outerElementType={outerElementType}
            >
              {Rows}
            </List>
          }
        </div>
      
      </div>
       
    </div>
  )
}

export default AdminPaymentRequests