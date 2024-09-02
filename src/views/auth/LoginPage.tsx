import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import loginValidation from "@/utils/validations/loginValidation";
import toast from "react-hot-toast";
import { useSellerLoginMutation } from "@/store/Reducers/authApiSlice";
import ConditionalLoader from "@/components/conditionals/ConditionalLoader";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/Reducers/authReducer";
const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [login,{isLoading}] = useSellerLoginMutation()
  const from = location?.state?.from?.pathname || "/seller/dashboard"
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
       className="relative space-8 w-[300px] border border-solid  p-5 rounded-sm" 
       onSubmit={form.handleSubmit(onSubmit)} >
        <ConditionalLoader condition={isLoading} />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" autoComplete="off" required {...field} />
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
                <Input type="password" autoComplete="off" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <div className="basis-1/4"/>
          <Button 
            disabled={isLoading ? true : false}
            className="my-6 py-4 basis-1/2" 
            type="submit">
              Sign In
          </Button>
          <div className="basis-1/4"/>
        </div>
        <h1 className="mulish font-semibold text-center">not Sign up ? <Link className="underline" to="/seller/signup">Sign Up</Link> </h1>
        <div className="flex  gap-3 mt-4 ">
          <button className="basis-1/2 flex justify-center py-3 bg-red-500 rounded-sm ">
            <span><FaGoogle color="white" /></span>
          </button>
          <button className="basis-1/2 flex justify-center py-3 bg-black rounded-sm">
            <span>
              <FaGithub color="white" />
            </span>
          </button>
        </div>
      </form>
    </Form>
   </div>
   );
}
 
export default LoginPage;