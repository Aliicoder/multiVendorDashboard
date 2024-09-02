import { useParams } from 'react-router-dom'

function SellerDetails() {
  const params = useParams();
  console.log(params)
  return (
    <div className='bg-slate-50 montserrat cp-3_10 h-full'>
      <h1>Seller Details</h1>
      <div className='flex flex-col'>
        <div className='p-7'>
          <div className='rounded-full max-w-28 aspect-square overflow-hidden'>
            <img className='object-contain w-full' src="/images/img2.jpg" alt="" />
          </div>
        </div>
        <div className='flex gap-10'>
          <div className='flex flex-col gap-3'>
            <h1>Basic Information</h1>
            <div className='bg-slate-100 cp-3_10 rounded-md'>
              <div><span>{"Name : "}</span><span>Ali fahmi</span></div>
              <div><span>Email:</span><span>ali@gmail.com</span></div>
              <div><span>Role:</span><span>Seller</span></div>
              <div><span>Status:</span><span>Deactive</span></div>
              <div><span>Payment Status:</span><span>Pending</span></div>
            </div>
          </div>
          <div className='flex flex-col cp-3_10 rounded-md gap-3'>
            <h1>Address Information</h1>
            <div className='bg-slate-100 cp-3_10'>
              <div><span>Shop Name:</span><span>Ali fahmi</span></div>
              <div><span>City:</span><span>banglore,manglore</span></div>
              <div><span>Districts:</span><span>yelhanka,kamanahalli</span></div>
              <div><span>State:</span><span>Karnataka</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3 mt-3'>
        <select className='c4 rounded-md bg-slate-100 cp-x-2_7 c4 cp-y-1_6' name="" id="">
          <option value="Activate">Activate</option>
          <option value="Deactive">Deactive</option>
        </select>
        <button className='cp-x-2_7 c4 cp-y-1_6 text-white rounded-sm bg-red-500'>
          Submit
        </button>
      </div>
    </div>
  )
}

export default SellerDetails