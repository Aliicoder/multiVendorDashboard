import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { IoReturnDownBack } from "react-icons/io5";
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
import {  useRef, useState } from "react";
import { MdPublishedWithChanges } from "react-icons/md";
const CATEGORIES = [
  {
    id:1,
    name:"mobiles"
  },
  {
    id:2,
    name:"tables"
  },
  {
    id:3,
    name:"bukes"
  },
 
  {
    id:3,
    name:"buckets3"
  }
]
const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  search: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  stock: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  price: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  discount: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  media:z
  .array(z.instanceof(File))
  .refine(files => {
    return files.every(file => file.type === "image/jpeg" || file.type === "video/mp4");
  }, "Only JPG and MP4 files are allowed")
})
import { FaDeleteLeft } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
interface CategoriesParams{
  id: number;
  name: string;
}
function SellerProductDetails() {
  const [edit,setEdit] = useState(false)
  const [filteredCategories,setFilteredCategories] = useState<CategoriesParams[]|undefined>([])
  const [category,setCategory] = useState("")
  const [showCategories,setShowCategories] = useState(false)
  const [files,setFiles] = useState([])
  const [filesUrls,setFilesUrls] = useState([])
  const searchCategoryRef = useRef(null)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  const findCategory = (value)=>{
    const regex = new RegExp(value)
    const categories = CATEGORIES.filter(category=>regex.test(category.name))
    console.log(categories)
    setFilteredCategories(categories)
  }
  const handleSearchCategory = (e) =>{
    let value =e.target.value
    console.log(value)
    if(value)
      findCategory(value.toLowerCase())
    if(!value)
      setFilteredCategories([])
  }
  const handleSetCategory = (e:React.ChangeEvent<HTMLDivElement>) =>{
    if(e.target.textContent)
      setCategory(e.target.textContent)
    if(searchCategoryRef.current)
      searchCategoryRef.current.value = ""
  }
  const handleShowCategories = (e) =>{
    console.log("show categories")
    setShowCategories(true)
  }
  const handleHideCategories = (e) =>{
    e.stopPropagation()
    console.log("hide categories")
    setShowCategories(false)
  }
  const handleMedia = (e:React.ChangeEvent<HTMLInputElement>) =>{
    let length = 0
    if(e.target.files)
      length = e.target.files.length
    if(length > 0){
      let newFiles = e.target.files
      let newUrls = []
      for( let file of newFiles)
        newUrls.push({url:URL.createObjectURL(file)})
      setFiles([...files, ...newFiles])
      setFilesUrls([...filesUrls,...newUrls])
      form.setValue("media",files)
    }
  }
  const handleImgChange = (img,i:number) =>{
    if(img){
     let updatedFiles = files
     let updatedFilesUrls = filesUrls
     updatedFiles[i]=img
     updatedFilesUrls[i] = {url:URL.createObjectURL(img)}
     setFiles([...updatedFiles])
     setFilesUrls([...updatedFilesUrls])

    }
  }
  const handleImgRemove = (imgIndex:number) =>{
    console.log(imgIndex)
    const updatedFiles = files.filter((file,index)=> index != imgIndex )
    const updatedFilesUrls = filesUrls.filter((file,index)=> index != imgIndex)
    setFiles([...updatedFiles])
    setFilesUrls([...updatedFilesUrls])
  }
  const handleEdit = () =>{
    setEdit(!edit)
  }
  const handlerStepBack = () =>{
    navigate(-1)
  }
  return (
    <div className=" relative flex justify-center items-center cp  bg-slate-50 w-full h-full ">
       <div className="flex flex-col cp-10 border rounded-md bg-white w-1/2 mx-auto">
        <div className="flex justify-end cp-10">
          <Button onClick={handleEdit} className="c3 " >
            Edit Product <span className="cp-l-6"><FiEdit3 /></span> 
          </Button>
        </div>
         <Form {...form}>  
          <form onClick={handleHideCategories} onSubmit={form.handleSubmit(onSubmit)} 
            className={`z-10 space-y-8 cp-10  bg-white flex flex-col w-full
            ${edit?"pointer-events-none opacity-75":""}`}>
            <div onClick={handlerStepBack} className="cp-6">
              <IoReturnDownBack />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Brand Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  gap-6">
              <div className="flex relative gap-6 w-1/2">
                <FormField
                  control={form.control}
                  name="category"
                  render={() => (
                    <FormItem className="w-1/2">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input value={category} readOnly  autoComplete="false" placeholder="" />
                      </FormControl>
    
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel className="text-transparent">search</FormLabel>
                      <FormControl >
                        <Input
                         ref={searchCategoryRef} 
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
                 <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                 
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
                <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem className="w-1/6  p-3">
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
                <div className="flex w-5/6 overflow-x-scroll">
                    {
                      filesUrls.map((file,i) =>{
                        console.log(i)
                       return (
                        <div key={i} className="h-full flex-shrink-0 w-1/4 p-2 ">
                          <div className="relative flex flex-col aspect-square  rounded-sm overflow-hidden">
                            <div className="flex justify-end ">
                              <div className="relative c2 p-1 bg-white rounded-sm  ">
                                <input onChange={(e)=>handleImgChange(e.target.files[0],i)} className="z-10 absolute w-full h-full opacity-0" type="file" />
                                <AiFillEdit />
                              </div>
                              <div onClick={()=>handleImgRemove(i)} className="c2  p-1 rounded-full bg-white rounded-sm ">
                                <FaDeleteLeft />
                              </div>
                            </div>
                            <div className="flex p-2 justify-center items-center overflow-hidden w-full">
                              <img className="object-contain  h-full " src={file.url} alt="" />
                            </div>
                          </div>
                        </div>
                      )})
                    }
                </div>
            </div>
            <div className="flex justify-end  ">
              <Button type="submit">
                Save Changes <span className="cp-l-6"><MdPublishedWithChanges /></span>
              </Button>
            </div>
          </form>
        </Form>
       </div>
    </div>
  )
}

export default SellerProductDetails