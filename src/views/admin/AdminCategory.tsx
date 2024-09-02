import { useEffect, useRef, useState } from 'react';
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useFetchCategoriesChunkMutation} from '@/store/Reducers/categoryApiSlice';
import ConditionalLoader from '@/components/conditionals/ConditionalLoader';
import { motion } from "framer-motion"
import TableHeader from '@/components/shared/TableHeader';
import Pagination from '@/components/shared/Pagination';
import { Counter } from '@/utils/types/types';
import { VARIANTS } from '@/constants/framerMotion';

function AdminCategory() {
  const [perPage,setPerPage] = useState(5)
  const [categoriesChunk,setCategoriesChunk] = useState({categories:[],count:0})
  const [searchValue,setSearchValue] = useState("")
  const [counter,setCounter] = useState<Counter>({prev:0,curr:1,next:2,max:2});
  const [fetchCategoriesChunk,{isLoading}] = useFetchCategoriesChunkMutation()
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);
  const handleLeft = () =>{
    setCounter(counter=>{
      if(counter.curr > 1)
        return {...counter,prev:counter.prev-1,curr:counter.curr-1,next:counter.next-1}
      return counter
    })
  }
  const handleRight = () =>{
    setCounter((counter)=>{
      if(counter.curr < counter.max)
        return {...counter,prev:counter.prev+1,curr:counter.curr+1,next:counter.next+1}
      return counter
    })
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
    setPerPage(parseInt(e.target.value))
  } 
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current as number); // Clear timeout correctly for both environments
    }
    timeoutRef.current = setTimeout(() => {
      if (searchValue !== value) 
        setSearchValue(value);
    }, 2000);
  };

  useEffect(() =>{
    const categoriesPerPage = async () =>{
      const { data } = await fetchCategoriesChunk({perPage,searchValue,curPage:counter.curr})
      console.log(data)
      setCategoriesChunk({categories:data.categoriesChunk,count:data.count})
      const categoriesLen = data.count;
      const pagesLen = Math.ceil(categoriesLen / perPage) ;
      console.log(categoriesLen,pagesLen,counter.curr);
      setCounter({...counter,max:pagesLen})
    }
    categoriesPerPage()
  },[searchValue,perPage])

  const [skipCounter,setSkipCounter] = useState(0) 
  useEffect(() =>{
    if(skipCounter > 1){
      const categoriesPerPage = async () =>{
        console.log(searchValue)
        const { data } = await fetchCategoriesChunk({perPage,searchValue,curPage:counter.curr})
        console.log(data)
        setCategoriesChunk({categories:data.categoriesChunk,count:data.count})
      }
      categoriesPerPage()
    }
    console.log(skipCounter)
    setSkipCounter(skipCounter+1)
  },[counter])
  return (
    <div className="flex  h-full flex-wrap cp-3_10 rounded-md">
      <div className='flex relative flex-col justify-between w-full cp-3_10 bg-slate-50'>
        <ConditionalLoader condition={isLoading} />
        <div>
          <TableHeader onPerPageChange={handlePerPageChange} onSearchChange={handleSearchChange}/>
          <div className='flex flex-col cgap-6'>
            <div>
              <table className="w-full">
                <thead>
                  <tr className=" c3 ">
                    <th className="cp-10">No</th>
                    <th className="cp-10">Icon</th>
                    <th className="cp-10">Name</th>
                    <th className="cp-10">Slug</th>
                    <th className="cp-10">Actions</th>
                  </tr>
                </thead>
                <motion.tbody
                  variants={VARIANTS}
                  initial="hidden"
                  animate="visible"
                >
                  {
                    categoriesChunk&&categoriesChunk.categories.map((category,i)=>{
                      return<> 
                        <motion.tr variants={VARIANTS} custom={i} key={category.name} className="c3 even:bg-slate-100">
                          <td className="text-center cp-5">{i+1}</td>
                          <td className="flex justify-center items-center cp-10">
                            <div className="max-w-8 aspect-square rounded-full overflow-hidden">
                              <img className="w-full object-contain" src={category.image} alt="" />
                            </div>
                          </td>
                          <td className="text-center cp-5">{category.name}</td>
                          <td className="text-center cp-5">{category.slug}</td>
                          <td className="">
                          <div className='flex justify-center items-center gap-3'>
                              <MdDeleteForever />
                              <MdEdit />
                              <MdAddToPhotos />
                          </div>
                          </td>
                        </motion.tr>
                      </> 
                    })
                  }
                </motion.tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination counter={counter} onLeftClick={handleLeft} onRightClick={handleRight}/>
      </div>
    </div>
  )
}

export default AdminCategory