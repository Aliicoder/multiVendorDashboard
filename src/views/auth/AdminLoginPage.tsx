import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLocation, useNavigate } from "react-router-dom"
import loginValidation from "@/utils/validations/loginValidation";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "@/store/Reducers/authReducer"
import ConditionalLoader from "@/components/conditionals/ConditionalLoader"
import toast from "react-hot-toast"
import { useAdminLoginMutation } from "@/store/Reducers/authApiSlice"
const AdminLoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [login,{isLoading}] = useAdminLoginMutation()
  const from = location?.state?.from?.pathname || "/admin/dashboard"
  //console.log(from)
  const form = useForm<z.infer<typeof loginValidation>>({resolver: zodResolver(loginValidation),})
  //console.log(user)
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    try {
      const response = await login(values).unwrap()
      console.log(response)
      dispatch(setCredentials(response.data))
      toast.success(response.message)
      navigate(from,{state:{from:location.pathname}})
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message ?? "try again later")
    }
  }
  return ( 
   <div className=" grid place-content-center w-lvw h-lvh ">
      <Form {...form}>
      <form
       className="space-8 w-[300px] border border-solid  p-5 rounded-sm relative"  
       onSubmit={form.handleSubmit(onSubmit)} >
        <ConditionalLoader condition={isLoading} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder=""  required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password"  placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <div className="basis-1/4"/>
            <Button 
            disabled={isLoading ? true : false} 
            className="my-6 py-4 basis-1/2" type="submit">Sign In</Button>
          <div className="basis-1/4"/>
        </div>
      </form>
    </Form>
   </div>
   );
}
 
export default AdminLoginPage;