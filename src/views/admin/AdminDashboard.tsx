import { FaCircleDollarToSlot } from "react-icons/fa6";
import { BiSolidCartAlt } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import Chart from "react-apexcharts"
import { Link } from "react-router-dom";
function AdminDashboard() {
  const state = {
    series : [
     {
      name: "Orders",
      data: [23,45,67,88,23,67,78,23,45,67,88,23]
     },
     {
      name: "Revenue",
      data: [23,45,67,88,23,67,78,23,45,67,88,23]
     },
     {
      name: "Sellers",
      data: [23,45,67,88,23,67,78,23,45,67,88,23]
     },
    ],
    options: {
      color : ["#000000"],
      plotOptions : {
        radius:10
      },
      chart : {
        background : 'transparent',
        foreColor : '#000000',
      },
      dataLabels: {
        encodeURI : false,
      },
      strock : {
        show: true,
        curve:['smooth','straight','stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width:.5,
        dashArray:0
      },
      xaxis:{
        categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend:{
        position : 'top'
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis:{
            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          options:{
            plotOptions:{
              bar :{
                horizontal :true,
              }
            },
            chart : {
              height : '550px',
            }
          }
        }
      ]
    }
  }
  return (
    <div>
      <div className="grid montserrat gap-2 cp-3_10 grid-cols-2 mt-3 md:grid-cols-2 lg:grid-cols-4 ">
        <div className="flex justify-around overflow-hidden cp-3_10 bg-teal-300 rounded-md    " >
          <div>
            <h1 className="c6">3045$</h1>
            <h3 className="c3">Total Sales</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <FaCircleDollarToSlot />
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-orange-300 rounded-md    " >
          <div>
            <h1 className="c6">37</h1>
            <h3 className="c3">Products</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <AiFillProduct />
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-slate-400 rounded-md    " >
          <div>
            <h1 className="c6">12</h1>
            <h3 className="c3">Sellers</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <HiUserGroup />
          </div>
        </div>
        <div className="flex justify-around overflow-hidden cp-3_10 bg-cyan-400 rounded-md    " >
          <div>
            <h1 className="c6">45</h1>
            <h3 className="c3">Orders</h3>
          </div>
          <div className="c3 flex justify-center items-center scale-150 ">
            <BiSolidCartAlt />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full cp-3_10 md:basis-4/6 lg:basis-4/6 xl:basis-4/6 ">
          <div className="cp-3_10 bg-slate-50 rounded-md">
            <Chart options={state.options} series={state.series} type="bar" height={350} />
          </div>
        </div>
        <div className="w-full cp-3_10 md:basis-2/6 lg:basis-2/6 xl:basis-2/6 ">
          <div className="flex flex-col gap-3 cp-3_10 bg-slate-50 rounded-sm ">
            <div className="flex justify-between mx-2">
              <h1 className="c2">Recent Sellers Messages</h1>
              <Link className="c2" to={"/"}>View All</Link>
            </div>
            <div className="flex bg-slate-100 rounded-md" >
              <div className="basis-3/12 flex justify-center items-center">
                  <div className=" max-w-10 max-h-10 m-3 rounded-full overflow-hidden">
                    <img className="w-full h-full scale-150 object-contain" src="/images/img2.jpg" alt="" />
                  </div>
              </div>
              <div className="basis-9/12 flex flex-col gap-3 w-full cp-3_10">
                <div className="flex justify-between">
                  <h1 className="c2">Admin</h1>
                  <h1 className="c2">3 hours ago</h1>
                </div>
                <div className="c2 cp-10 pl-5 text-gray-950  bg-slate-300 rounded-md">
                  how are you doing ?
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
         <div className="flex flex-col gap-3 bg-slate-50 mx-2 cp-3_10 rounded-md">
            <div className=" flex justify-between cp-3_10">
              <h1 className="c2">Recent Orders</h1>
              <Link className="c2" to={"/"}>View All</Link>
            </div>
            <table className="w-full">
               <thead>
                <tr className="border-b c3 ">
                  <th className="cp-10">Order Id</th>
                  <th className="cp-10">Price</th>
                  <th className="cp-10">Payment status</th>
                  <th className="cp-10">Order status</th>
                  <th className="cp-10">Active</th>
                </tr>
               </thead>
               <tbody>
                <tr className=" c3">
                  <td className="text-center cp-5">#23423</td>
                  <td className="text-center cp-5">30$</td>
                  <td className="text-center cp-5">Pending</td>
                  <td className="text-center cp-5">Pending</td>
                  <td className="text-center cp-5">view</td>
                </tr>
               </tbody>
            </table>
         </div>
    </div>
  )
}

export default AdminDashboard