import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FaGithub, FaGoogle } from "react-icons/fa";
import {Form,FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import signupValidation from "@/utils/validations/signupValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch} from "react-redux";
import ConditionalLoader from "@/components/conditionals/ConditionalLoader";
import { Label } from "@radix-ui/react-label";
import { useSignupMutation ,useLoginMutation} from "@/store/Reducers/authApiSlice";
import { setCredentials } from "@/store/Reducers/authReducer";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [signup,{isLoading}] = useSignupMutation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/seller/dashboard"
  const form = useForm<z.infer<typeof signupValidation>>({resolver: zodResolver(signupValidation)})
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      const response = await signup(values).unwrap()
      dispatch(setCredentials(response.data))
      toast.success(response.message)
      navigate(from)
    } catch (error) {
      toast.error(error?.data?.message ?? "try again later")
    }
    
  }
  return ( 
   <div className=" grid place-content-center w-lvw h-lvh ">
      <Form {...form}>
      <form
       className="relative space-8 roboto w-[400px] border border-solid  p-5 rounded-sm" 
       onSubmit={form.handleSubmit(onSubmit)} >
        <ConditionalLoader condition={isLoading} />
        <div className="c6 pb-5 roboto font-normal montserrat">Welcome to souq <span className='text-blue-600'>.</span></div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="on" placeholder="" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" autoComplete="on" required {...field} />
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
                <Input type="password" autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter The Password again</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex gap-3 cp-6 items-center ">
              <FormControl>
              <Checkbox
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
                <Label htmlFor="terms" className="p-0 !mt-0">
                  I agree to the privacy policy and term
                </Label>
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <div className="basis-1/4"/>
          <Button className="my-6 py-4 basis-1/2" type="submit">Sign Up</Button>
          <div className="basis-1/4"/>
        </div>
        <h1 className="mulish font-semibold text-center">Already Sign up ? <Link className="underline" to="/seller/login">Sign in</Link> </h1>
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
 
export default RegisterPage;