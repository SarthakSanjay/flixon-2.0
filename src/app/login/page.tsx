"use client"

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

import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().max(20, {
    message: "Username must be  less than 20 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters"
  })
})

export default function page() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("http://localhost:4000/api/user/login", values, {
      withCredentials: true
    })
    // const data = await res.data
    // console.log('data', data)
    if (res.status === 200) {
      console.log("inside app")
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-black text-white h-screen w-screen flex justify-center items-center flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Phone no</FormLabel>
              <FormControl>
                <Input placeholder="email/phone" {...field} />
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"ghost"} type="submit">Submit</Button>
      </form>
    </Form>
  )
}
