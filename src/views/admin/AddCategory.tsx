import { useEffect, useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import categoryValidation from "@/utils/validations/categoryValidation";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';
import { FaDeleteLeft } from 'react-icons/fa6';
import toast from "react-hot-toast";
import { useAddCategoryMutation, useFetchCategoriesNamesMutation } from "@/store/Reducers/categoryApiSlice";
import { selectCurrentCategories, setCategories } from "@/store/Reducers/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import ConditionalLoader from "@/components/conditionals/ConditionalLoader";

function AddCategory() {
  const CATEGORIES_NAMES = useSelector(selectCurrentCategories)
  const dispatch = useDispatch()
  const [searchValue,setSearchValue] = useState("")
  const [filteredCategories,setFilteredCategories] = useState<[]|undefined>([])
  const [file,setFile] = useState<File|undefined>()
  const [fileUrl,setFileUrl] = useState<string|undefined>()
  const [showCategories,setShowCategories] = useState(false)
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const searchCategoryRef = useRef(null)
  const [addCategory,{isLoading}] = useAddCategoryMutation()
  const [fetchCategoriesNames] = useFetchCategoriesNamesMutation() 
  useEffect(() =>{
    const initiateCategoriesNames = async () =>{
      const result = await fetchCategoriesNames({})
      dispatch(setCategories(result.data.categories))
    }
    initiateCategoriesNames()
  },[])
  const form = useForm<z.infer<typeof categoryValidation>>({
    resolver: zodResolver(categoryValidation),defaultValues: {},
  })
  const findCategory = (value:string)=>{
    const regex = new RegExp(value)
    const categories = CATEGORIES_NAMES.filter(category=>regex.test(category.name))
    console.log(categories)
    setFilteredCategories(categories)
  }
  const handleSearchCategory = (e) =>{
    let value = e.target.value
    setSearchValue(value) 
  }
  useEffect(() =>{
    if(searchValue != "")
      findCategory(searchValue)
    else
      setFilteredCategories([])
  },[searchValue])
  const handleSetCategory = (e) =>{
    form.setValue("parentCategory", e.target.textContent)
    setSearchValue("")
  }
  const handleShowCategories = (e) =>{
    console.log("show categories")
    setShowCategories(true)
  }
  const handleMedia = (e:any) =>{
    let length = e.target.files.length
    console.log(e.target.files)
    if(length > 0){
      let newFile = e.target.files[0]
      let newUrl = URL.createObjectURL(newFile)
      setFile(newFile)
      setFileUrl(newUrl)
      form.setValue("media",newFile)
    }
  }
  const handleImgRemove = () =>{
    setFile(undefined)
    setFileUrl(undefined)
  }
  
  const handleClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    if(!categoriesRef.current?.contains(e.target as Node)){
      console.log("hide categories")
      setShowCategories(false)
    }
  }

  async function onSubmit(values: z.infer<typeof categoryValidation>) {
    try {
      const response = await addCategory(values).unwrap()
      console.log(response)
      toast.success(response.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return (
    <div>
      <div onClick={handleClose} className={`w-full relative montserrat bg-slate-100 cp-3_10`}>
      <ConditionalLoader condition={isLoading} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-8 ">
           <div className='basis-1/2'>
              <FormField
                  control={form.control}
                  name="media"
                  render={({}) => (
                    <FormItem className='flex flex-col h-full'>
                      <FormLabel>Category image</FormLabel>
                      <div className='relative grow'>
                        <div>
                          <div className="flex justify-end ">
                            <div onClick={()=>handleImgRemove()} className="c2  p-1 bg-white rounded-sm ">
                              <FaDeleteLeft />
                            </div>
                          </div>
                          <div className='absolute flex p-3 justify-center items-center  w-full h-full'>
                            <div className='rounded-full bg-white overflow-hidden h-full aspect-square'>
                              <img className='w-full  object-contain' src={fileUrl} alt="" />
                            </div>
                          </div>
                        </div>
                        <FormControl>
                          <Input className='opacity-0 h-full w-full' onChange={handleMedia} type='file' placeholder=""  />
                        </FormControl>
                      </div>
                      <FormDescription>
                        image shouldn`t be duplicated.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
           </div>
            <div className='basis-1/2'>
              <FormField
                control={form.control}
                name="categoryName"
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl >
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Category shouldn`t be duplicated.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex relative gap-6 w-full">
              <FormField
                control={form.control}
                name="parentCategory"
                render={({field}) => (
                  <FormItem className="w-1/2">
                    <FormLabel>parent category</FormLabel>
                    <FormControl>
                      <Input readOnly {...field} autoComplete="false" placeholder="" />
                    </FormControl>
  
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control} 
                name="search"
                render={() => (
                  <FormItem  ref={categoriesRef} className="w-1/2">
                    <FormLabel className="text-transparent">search</FormLabel>
                    <FormControl >
                      <Input
                       ref={searchCategoryRef} 
                       value={searchValue}
                       onFocus={handleShowCategories} onChangeCapture={handleSearchCategory} 
                       autoComplete="false" placeholder="is it nested category ?" />
                    </FormControl>
                    {
                      showCategories ? 
                      <div 
                        className={`
                        ${filteredCategories?.length == 0 || filteredCategories == undefined ?"hidden":""} 
                        absolute flex p-2 fo flex-col gap-1 montserrat border  rounded-md  
                        cp-6 bg-white w-full left-0  `}>
                          {
                            filteredCategories.map((category) =>(
                              <div className="hover:bg-slate-50 rounded-md cursor-pointer"
                              onClick={handleSetCategory}
                              >{category?.name}</div>
                            ))
                          }
                      </div>
                      :
                      null 
                    }
                  </FormItem>
                )}
              />
            </div>
              <FormField
                control={form.control}
                name="categoryDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AddCategory