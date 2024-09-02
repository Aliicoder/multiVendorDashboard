import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md"
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
function AdminSellerRequest() {
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
  return (
    <div className="flex flex-wrap rounded-md">       
    <div className='w-full   bg-slate-50'>
    <div className=" flex justify-between cp-3_10">
      <select className='c4 rounded-md bg-slate-100 px-3' name="" id="">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <div className='flex relative overflow-hidden items-center gap-4 ml-10 '>
        <input placeholder='Search for Seller ' 
        className={`
              max-w-[300px] px-5 py-2
          c3  rounded-lg bg-slate-100 transition-all  outline-none  `} type="text" />
        <div className="absolute h-full flex justify-center items-center cp-5 right-0 bg-slate-100 border-l">
          <CiSearch className="m-1 aspect-square cursor-pointer"/>
        </div>
      </div>
    </div>
    <div>
      <table className="w-full">
        <thead>
          <tr className=" c3 ">
            <th className="cp-10">No</th>
            <th className="cp-10">Image</th>
            <th className="cp-10">Shop Name</th>
            <th className="cp-10">Payment status</th>
            <th className="cp-10">Email</th>
            <th className="cp-10">status</th>
            <th className="cp-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            [1,2,3,4,5,6,7,8,9,10].map((num,i)=>{
              return<> 
              <tr className="c3 even:bg-slate-100">
                <td className="text-center cp-5">{num}</td>
                <td className="flex justify-center items-center cp-10">
                  <div className="max-w-8 aspect-square rounded-full overflow-hidden">
                    <img className="w-full object-contain" src="/images/img2.jpg" alt="" />
                  </div>
                </td>
                <td className="text-center cp-5 truncate ">Coffee days</td>
                <td className="text-center cp-5 truncate">Pending</td>
                <td className="text-center cp-5 truncate">CofD@gmail.com</td>
                <td className="text-center cp-5 truncate text-orange-300">Pending</td>
                <td className="text-center cp-5 truncate flex justify-center   gap-3">
                  <Link to={`${num}`}>
                    <FaEye className="hover:cursor-pointer" />
                  </Link>
                </td>
              </tr>
            </> 
            })
          }
        </tbody>
      </table>
    </div>
    <div className="flex c3 mt-3 justify-center bg-slate-100 gap-3 p-3">
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
   
</div>
  )
}

export default AdminSellerRequest