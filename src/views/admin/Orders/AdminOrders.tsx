import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft ,FaAngleRight} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
function AdminOrders() {
  const orders = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
  const [counter,setCounter] = useState({
    prev:0,curr:1,next:2,max:1,
  });
  useEffect(() =>{
    const perPage = 5 ;
    const ordersLength = orders.length;
    const pagesNumber = Math.ceil(ordersLength / perPage) ;
    setCounter(prev=>{
      if(pagesNumber >= 2)
        return{...prev, max:pagesNumber}
      if(pagesNumber == 1)
        return{...prev,next:-1,max:pagesNumber}
    })
  },[]);
  const handleLeft = () =>{
    setCounter(counter=>{
      console.log(counter)
      if(counter.prev != 0)
        return {...counter,prev:counter.prev-1,curr:counter.curr-1,next:counter.next-1}
      return counter
    })
  }
  const handleRight = () =>{
    setCounter(counter=>{
      console.log(counter)
      if(counter.next != counter.max)
        return {...counter,prev:counter.prev+1,curr:counter.curr+1,next:counter.next+1}
      return counter
    })
  }
  const VARIANTS = {
    hidden:{
      opacity: 0
    },
    visible:(index:number)=>({
      opacity: 1,
      transition:{
        delay: 0.1 * index,
      }
    })
  }
  return (
    <div className="flex flex-col gap-3 bg-slate-50 m-2 cp-3_10 rounded-md">
      <div className=" flex justify-between cp-3_10">
        <select className='c4 rounded-md bg-slate-100 px-3' name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <div className='flex relative overflow-hidden items-center gap-4 ml-10 '>
        <input placeholder='Search for order ' 
        className={`
              max-w-[300px] px-5 py-2
          c3  rounded-lg bg-slate-100 transition-all  outline-none  `} type="text" />
        <div className="absolute h-full flex justify-center items-center cp-5 right-0 bg-slate-100 border-l">
          <CiSearch className="m-1 aspect-square cursor-pointer"/>
        </div>
      </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className=" c3 ">
            <th className="cp-10">Order Id</th>
            <th className="cp-10">Price</th>
            <th className="cp-10">Payment status</th>
            <th className="cp-10">Order status</th>
            <th className="cp-10">Active</th>
          </tr>
        </thead>
        <motion.tbody
          variants={VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {
            [1,2,3,4,5,6,7,8,9,10].map((num,i)=>{
              return<> 
              <motion.tr variants={VARIANTS} custom={i} className="c3 even:bg-slate-100">
                <td className="text-center cp-5">#23423</td>
                <td className="text-center cp-5">30$</td>
                <td className="text-center cp-5">Pending</td>
                <td className="text-center cp-5">Pending</td>
                <td className="text-center cp-5 font-semibold">
                  <Link to={`${i}`}>
                    view
                  </Link>
                </td>
              </motion.tr>
            </> 
            })
          }
        </motion.tbody>
      </table>
      <div className="flex c4 justify-center bg-slate-100 gap-3 p-3">
        <div className="flex items-center gap-3">
            <div onClick={handleLeft}>
              <FaAngleLeft />
            </div>
            <ul className="flex gap-3">
              {counter.prev == 0 ?<li></li>:<li>{counter.prev}</li>}
              <li className="font-semibold">{counter.curr}</li>
              {counter.next == counter.max?<li></li>:<li>{counter.next}</li>}
            </ul>
            <div onClick={handleRight}>
              <FaAngleRight />
            </div>
        </div>
      </div>
  </div>
  )
}

export default AdminOrders