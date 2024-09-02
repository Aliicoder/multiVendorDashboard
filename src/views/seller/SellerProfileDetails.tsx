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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
function SellerProfileDetails() {
  const [edit,setEdit] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }

  const handleEdit = () =>{
    setEdit(!edit)
  }
  return (
    <div className='w-10/12 flex flex-col h-[100svh] cp-3_10 bg-white'>
    <div className="flex cp-10 justify-end">
      <button onClick={handleEdit} className="c3 bg-slate-800 text-white rounded-md  cp-10" > Edite</button>
    </div>
    <div className={`flex cgap-6 items-center 
      ${edit ? "":"pointer-events-none opacity-75"}`}>
      <div className="flex  justify-center items-center p-5">
        <div className="cw-200 rounded-full overflow-hidden aspect-square  bg-white">
          <img className="w-full " src="/images/img2.jpg" alt="" />
        </div>
      </div>
      <div className="flex text-white  basis-9/12 cgap-6">
        <button className="c3 bg-blue-600 rounded-md  cp-10">Update</button>
        <button className="c3 bg-red-400 rounded-md  cp-10">Delete avatar</button>
      </div>
    </div>
    <div>
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} 
        className={`space-y-8  w-full cp-10
        ${edit ? "":"pointer-events-none opacity-75"}`}>
        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="coffer days" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>State Name</FormLabel>
              <FormControl>
                <Input placeholder="karnataka" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>District Name</FormLabel>
                <FormControl>
                  <Input placeholder="banglore" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Sub district</FormLabel>
              <FormControl>
                <Input placeholder="avalahill" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  </div>
  )
}

export default SellerProfileDetails