import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentCategories, setCategories } from "@/store/Reducers/categorySlice";
import { useFetchCategoriesNamesMutation } from "@/store/Reducers/categoryApiSlice";
import { useAddProductMutation } from "@/store/Reducers/productApiSlice";
import toast from "react-hot-toast";
import productValidations from "@/utils/validations/productValidations"
import ConditionalLoader from "@/components/conditionals/ConditionalLoader"
function AddProduct() {
  const CATEGORIES_NAMES = useSelector(selectCurrentCategories)
  const [addProduct,{isLoading}] = useAddProductMutation()
  const [previewMedia,setPreviewMedia] = useState({media:"",index:0})
  const [filteredCategories,setFilteredCategories] = useState<[]|undefined>([])
  const [searchValue,setSearchValue] = useState("")
  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const [showCategories,setShowCategories] = useState(false)
  const [files,setFiles] = useState([])
  const [filesUrls,setFilesUrls] = useState([])
  const dispatch = useDispatch()
  const [fetchCategoriesNames] = useFetchCategoriesNamesMutation()
  const searchCategoryRef = useRef(null)
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof productValidations>>({
    resolver: zodResolver(productValidations),
    defaultValues: {
    },
  })
 
  const findCategory = (value)=>{
    const regex = new RegExp(value)
    const categories = CATEGORIES_NAMES.filter(category=>regex.test(category.name))
    console.log(categories)
    setFilteredCategories(categories)
  }
  const handleSearchCategory = (e) =>{
    let value =e.target.value
    setSearchValue(value) 
  }
  const handleSetCategory = (e) =>{
    console.log(e.target.textContent)
    form.setValue("category", e.target.textContent)
    form.setValue("search", e.target.textContent)
  }
  const handleShowCategories = (e) =>{
    console.log("show categories")
    setShowCategories(true)
  }
  const handleMedia = (e) =>{
    let length = e.target.files.length
    if(length > 0){
      let newFiles = e.target.files
      let newUrls = []
      for( let file of newFiles)
        newUrls.push({url:URL.createObjectURL(file)})
      setFiles([...files, ...newFiles])
      setFilesUrls([...filesUrls,...newUrls])
      
    }
  }
  const handleImgChange = (img) =>{
    if(img){
     let updatedFiles = files
     let updatedFilesUrls = filesUrls
     updatedFiles[previewMedia.index]=img
     updatedFilesUrls[previewMedia.index] = {url:URL.createObjectURL(img)}
     setFiles([...updatedFiles])
     setFilesUrls([...updatedFilesUrls])
    }
  }
  const handleClose = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    if(!categoriesRef.current?.contains(e.target as Node)){
      console.log("hide categories")
      setShowCategories(false)
    }
  }
  const handleImgRemove = () =>{
    console.log(previewMedia.index)
    const updatedFiles = files.filter((file,index)=> index != previewMedia.index )
    const updatedFilesUrls = filesUrls.filter((file,index)=> index != previewMedia.index)
    setFiles([...updatedFiles])
    setFilesUrls([...updatedFilesUrls])
    
  }
  const handlePreviewMedia = (imgIndex:number) =>{
    console.log(filesUrls[imgIndex])
    setPreviewMedia({media:filesUrls[imgIndex],index:imgIndex});
  }
  useEffect(() =>{
    form.setValue("media",files)
    if(filesUrls[0])
      setPreviewMedia({media:filesUrls[0],index:0})
    else
      setPreviewMedia({media:"",index:0})
  },[files,filesUrls])
  useEffect(() =>{
    if(searchValue != "")
      findCategory(searchValue)
    else
      setFilteredCategories([])
  },[searchValue])
  useEffect(() =>{
    const initiateCategoriesNames = async () =>{
      const result = await fetchCategoriesNames({})
      dispatch(setCategories(result.data.categories))
    }
    initiateCategoriesNames()
  },[])
  async function onSubmit(values: z.infer<typeof productValidations>) {
    try {
      const response = await addProduct(values).unwrap()
      console.log(response)
      toast.success(response.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return (
    <div onClick={handleClose} className=" relative flex justify-center items-center cp  bg-slate-50 w-full h-full ">
       <ConditionalLoader condition={isLoading}/>
       <Form {...form}>
        <form  onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col z-10 space-y-8 gap-3  cp-10 border rounded-md bg-white w-1/2 mx-auto">
          <h1 className="font-medium cp-6">New Product</h1>
          <div className="flex gap-6 ">
            <div className="flex flex-col gap-6 w-8/12">
                <div className="flex flex-col bg-slate-50 rounded-md cp-6 gap-6">
                  <h1 className="font-medium cp-6">General Information</h1>
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="~Nike V2K" {...field} />
                          </FormControl>
                          <FormDescription>
                            Make sure name not duplicate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="~Nike new edition running shoes"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter brief description
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex bg-slate-50 rounded-md flex-col cp-6 gap-6"> 
                  <h1 className="font-medium cp-6">Pricing and Stock</h1>
                  <div className="flex gap-6">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Brand Name</FormLabel>
                          <FormControl>
                            <Input placeholder="~Nike" {...field} />
                          </FormControl>
                        
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input placeholder="~1000" {...field} />
                        </FormControl>
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex cp-6 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="~100$" {...field} />
                        </FormControl>
                      
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Discount {"(optional)"}</FormLabel>
                        <FormControl>
                          <Input placeholder="~10%" {...field} />
                        </FormControl>
                    
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
                
            </div>
            <div className="flex flex-col gap-6  w-4/12">
              <div className="grow flex h-4/6 flex-col gap-6">
                <div className="flex flex-col grow h-3/4  bg-slate-50 cp-6 rounded-md">
                  {
                    previewMedia.media
                    &&
                    <div className="flex justify-end cp-6 ">
                      <div className="relative c2 p-1 bg-white rounded-sm  ">
                        <input onChange={(e)=>handleImgChange(e.target.files[0])} className="z-10 absolute w-full h-full opacity-0" type="file" />
                        <AiFillEdit />
                      </div>
                      <div onClick={handleImgRemove} className="c2  p-1  bg-white rounded-sm ">
                        <FaDeleteLeft />
                      </div>
                    </div> 
                  }
                  <div className="bg-white w-full flex  justify-center items-center  overflow-hidden h-full rounded-md">
                    <img className="object-contain h-full" src={previewMedia.media.url} alt="" />
                  </div>
                </div>
                <div className="flex w-ful  overflow-x-scroll">
                  <FormField
                    control={form.control}
                    name="media"
                    render={({}) => (
                      <FormItem className="h-full flex-shrink-0 w-1/4">
                        <div className="relative hover:bg-slate-200 border rounded-md">
                          <FormControl >
                            <div className="h-full aspect-square">
                              <Input onChange={handleMedia} className="absolute z-10 cursor-pointer opacity-0 w-full h-full" multiple type="file" placeholder="shadcn"/>
                            </div>
                          </FormControl>
                          <MdPermMedia className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {
                    filesUrls.map((file,i) =>(
                      <div key={i} onClick={()=>handlePreviewMedia(i)} className="h-full flex-shrink-0 w-1/4 ">
                        <div className="relative flex flex-col aspect-square  rounded-sm overflow-hidden">
                          <div className="flex justify-center items-center overflow-hidden w-full">
                            <img className="object-contain  h-full " src={file.url} alt="" />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex flex-col h-2/6 gap-6">
                <div className=" bg-slate-50">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({field}) => (
                      <FormItem className="hidden">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly autoComplete="false" placeholder="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="search"
                    render={({field}) => (
                      <FormItem ref={categoriesRef}  className="w-full cp-6 rounded-md">
                        <FormLabel className="">Product Category</FormLabel>
                        <FormControl >
                          <Input
                          ref={searchCategoryRef} 
                          {...field}
                          onFocus={handleShowCategories} onChangeCapture={handleSearchCategory} 
                          autoComplete="false" placeholder="search your category" />
                        </FormControl>
                        <FormMessage />
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
                <div className="flex cp-6 justify-end  ">
                  <Button className="" type="submit">Submit</Button>
                </div>
               </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProduct

         