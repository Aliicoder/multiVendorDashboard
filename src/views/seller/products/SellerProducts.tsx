import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { GrFormView } from "react-icons/gr";
import { Counter } from "@/utils/types/types";
import { useFetchProductsChunkMutation } from "@/store/Reducers/productApiSlice";
import TableHeader from "@/components/shared/TableHeader";
import { PRODUCTS_TABLE_HEADERS } from "@/constants/shared";
import LinkButton from "@/components/buttons/LinkButton";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
const ConditionalLoader = lazy(()=> import("@/components/conditionals/ConditionalLoader"));
const TableHeaderValues = lazy(()=> import("@/components/shared/TableHeaderValues"));
const Pagination = lazy(()=> import("@/components/shared/Pagination"));
function SellerProducts() {
  const [perPage,setPerPage] = useState(5)
  const [productsChunk,setProductsChunk] = useState({products:[],count:0})
  const [searchValue,setSearchValue] = useState("")
  const [counter,setCounter] = useState<Counter>({prev:0,curr:1,next:2,max:2});
  const [fetchProductsChunk,{isLoading}] = useFetchProductsChunkMutation()
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  const handlePerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) =>{
    setPerPage(parseInt(e.target.value))
  },[perPage])
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current as number); 
    }
    timeoutRef.current = setTimeout(() => {
      if(searchValue !== value) 
        setSearchValue(value);
    }, 2000);
  },[searchValue])
  const handleLeft = useCallback(() =>{
    setCounter(counter=>{
      console.log(counter)
      if(counter.prev != 0)
        return {...counter,prev:counter.prev-1,curr:counter.curr-1,next:counter.next-1}
      return counter
    })
  },[counter])
  const handleRight = useCallback( () =>{
    setCounter(counter=>{ console.log(counter)
      if(counter.next != counter.max)
        return {...counter,prev:counter.prev+1,curr:counter.curr+1,next:counter.next+1}
      return counter
    })
  },[counter])
  useEffect(() =>{
    const categoriesPerPage = async () =>{
      const { data } = await fetchProductsChunk({perPage,searchValue,curPage:counter.curr}) ; console.log("query1 result>>", data)
      setProductsChunk({products:data.productsChunk,count:data.count})
      const categoriesLen = data.count;
      const pagesLen = Math.ceil(categoriesLen / perPage) ; console.log("counter >>",categoriesLen,pagesLen,counter.curr);
      setCounter({...counter,max:pagesLen})
    }
    categoriesPerPage()
  },[searchValue,perPage])
  const [skipCounter,setSkipCounter] = useState(0) 
  useEffect(() =>{
    if(skipCounter > 1){
      const categoriesPerPage = async () =>{
        console.log(searchValue)
        const { data } = await fetchProductsChunk({perPage,searchValue,curPage:counter.curr}) ;  console.log("query2 result>>",data)
        setProductsChunk({products:data.productsChunk,count:data.count})
      }
      categoriesPerPage()
    };//console.log("skipCounter>>",skipCounter)
    setSkipCounter(skipCounter+1)
  },[counter])
  return (
    <div className="flex  h-full flex-wrap cp-3_10 rounded-md">
      <div className="flex relative flex-col justify-between w-full cp-3_10 bg-slate-50">
        <ConditionalLoader condition={isLoading} />
        <div>
          <TableHeader onPerPageChange={handlePerPageChange} onSearchChange={handleSearchChange} />
          <div className='flex flex-col cgap-6'>
            <table className="w-full">
              <thead>
                <TableHeaderValues values={PRODUCTS_TABLE_HEADERS}/>
              </thead>
              <tbody>
                {
                  productsChunk.products&&productsChunk.products.map((product,i)=>{
                    return<> 
                    <tr className="c3 even:bg-slate-100">
                      <td className="text-center cp-5">{i+1}</td>
                      <td className="flex justify-center items-center cp-10">
                        <div className="max-w-8 aspect-square rounded-full overflow-hidden">
                          <img loading="lazy" className="w-full object-contain" src={product?.media[0]} alt="" />
                        </div>
                      </td>
                      <td className="text-center cp-5">{product.name}</td>
                      <td className="text-center cp-5">{product.category}</td>
                      <td className="text-center cp-5">{product.brand}</td>
                      <td className="text-center cp-5">{product.price}</td>
                      <td className="text-center cp-5">{product.stock}</td>
                      <td className="text-center  cp-5 font-semibold">
                        <div className="flex w-full h-full justify-center">
                            <LinkButton to={`${i}`}>
                              <GrFormView />
                            </LinkButton>
                            <LinkButton to={`edit/${product._id}`}>
                              <MdModeEditOutline />
                            </LinkButton>
                            <LinkButton to={`${i}`}>
                              <MdDeleteForever />
                            </LinkButton>
                        </div>
                      </td>
                    </tr>
                  </> 
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <Pagination counter={counter} onLeftClick={handleLeft} onRightClick={handleRight}/>
      </div>
    </div>
  )
}

export default SellerProducts