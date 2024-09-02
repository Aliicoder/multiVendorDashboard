import React from 'react'
import { FaEye } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { MdAddToPhotos, MdDeleteForever, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'

function AdminOrderDetails() {
  return (
    <div className='flex gap-3 montserrat flex-col w-full h-full bg-slate-50'>
      <div className='flex ch-70 justify-between w-full bg-slate-100' >
        <div className='flex justify-center items-center'>
          <h1 className='font-semibold cp-10'>Order Details</h1>
        </div>
        <select className='cp-6 bg-slate-100 ' name="" id="">
          <option value="pending">Pending</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>     
      </div>
      <div className='flex'>
        <div className='flex flex-col gap-3 max-w-[50%]'>
          <table>
            <tbody>
              <tr>
                <td className='p-2 font-semibold'>Invoice</td> <td className='p-2'>43g34dfg345</td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Date</td> <td className='p-2'>3 dec 2024</td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Deliver To</td> <td className='p-2'>Ali Fahmi</td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Address</td> <td className='p-2'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Payment method</td> <td className='p-2'>Cash on delivery</td>
              </tr>
              <tr>
                <td className='p-2 font-semibold'>Price</td> <td className='p-2'>$300</td>
              </tr>
            </tbody>
          </table>
          <div className='flex flex-col gap-3 cp-10'>
            <h1>Sellers</h1>
            {
              [1,2,3].map((seller) =>(
                <div className='flex items-center gap-6 ch-70 bg'>
                  <div className='h-full cp-6 scale-75 ' >
                    <div className='h-full rounded-full ring-4  aspect-square overflow-hidden object-contain'>
                      <img className='w-full ' src="/images/img2.jpg" alt="" />
                    </div>
                  </div>
                  <div>
                    <h1 className='font-semibold'>Coffee days</h1>
                    <h1>Quantity <span className='p-1 bg-slate-100 rounded-md'>2</span></h1>
                  </div>
                  <div>
                    <h1>status <span className='p-1 bg-slate-100 text-orange-400'>pending</span></h1>
                    <h1>amount <span>$100</span></h1>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col gap-3 border-l w-full h-full'>
          <h1 className='cp-5'> Orders</h1>
          <table className="w-full">
            <thead>
              <tr className=" c3 ">
                <th className="cp-10">No</th>
                <th className="cp-10">Shop Name</th>
                <th className="cp-10">Category</th>
                <th className="cp-10">Price</th>
                <th className="cp-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                [1,2,3,4,5,6,7,8,9,10].map((num,i)=>{
                  return<> 
                  <tr className="c3 even:bg-slate-100">
                    <td className="text-center cp-5">{num}</td>
                    <td className="flex justify-center items-center cp-5">Coffee days</td>
                    <td className="text-center cp-5">Cloths</td>
                    <td className="text-center cp-5">$30</td>
                    <td className="text-center cp-5 flex justify-center gap-3">
                    <MdEdit />
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
      </div>
      
    </div>
  )
}

export default AdminOrderDetails