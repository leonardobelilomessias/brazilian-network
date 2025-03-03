"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  useForm } from "react-hook-form";
import axios, { AxiosError } from 'axios';
import { z } from "zod"
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Digite um email válido." }),
  password: z.string().min(6,{ message: "Digite uma senha com no mínimo 6 digitos." }).max(50),
  confirmPassword:z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não são iguais.",
      path: ['confirmPassword']
    });
  }
});

export function FormSignup(){
  const { toast } = useToast()
  const[load,setLoad]= React.useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })
    async   function onSubmit(values: z.infer<typeof formSchema>) {
      setLoad(true)
        try{
          const user =   await axios.post("/api/singup",{email:values.email, password:values.password})
          if(user.data?.id){
      
            // router.replace('/dashboard')
          }
          
        
          }catch(error:AxiosError | any){

            if (error instanceof AxiosError){
              console.log(error.response,"infomação do erro")
              if(error.response?.data.message ===`User alredy exist`){
                toast({
                  variant: "destructive",
                  title: "O Email já está em uso",
                  description: "Tente fazer login com o email fornecido",
                  action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
                })
                return
              }
              
              if(error.response?.status  ===401){

                toast({
                  variant: "destructive",
                  title: "Email e senha estão incorretos",
                  description: "Verifique os dados de login e tente novamente.",
                  action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
                })
              }else{
                                toast({
                                  variant: "destructive",
                                  title: "Houve um erro com o login",
                                  description: "Verifique os dados de login e tente novamente mais tarde, ou entre em contato com o suporte.",
                                  action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
                                })
              }
                // toast("Usuario ou senhas incorretos. Tente novamente");
              
              
            } 
            if(error?.response.message ===`duplicate key value violates unique constraint "users_pkey"`){
              toast({
                variant: "destructive",
                title: "O Email já está em uso",
                description: "Tente fazer login com o email fornecido",
                action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
              })
            }
            if(error?.response.message ===`duplicate key value violates unique constraint "users_pkey"`){
              toast({
                variant: "destructive",
                title: "O Email já está em uso",
                description: "Tente fazer login com o email fornecido",
                action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
              })
            }
            if(error?.response.message ===`over_email_send_rate_limit`){
              toast({
                variant: "destructive",
                title: "O Email já está em uso",
                description: "Tente fazer login com o email fornecido",
                action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
              })
            }
            if(error?.data?.message ===`User alredy exist`){
              toast({
                variant: "destructive",
                title: "O Email já está em uso",
                description: "Tente fazer login com o email fornecido",
                action: <ToastAction altText="Tente novamente">Tente novamente</ToastAction>,
              })
            }
            
          }finally{
            setLoad(false)
          }

        router.push('/dashboard')
      }
    return(
        <>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="align-left self-end ">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email"  type="email"{...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
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
              <FormLabel>Repita a Senha</FormLabel>
              <FormControl>
                <Input placeholder="Senha" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
        !load&&
        <Button className="w-full mt-3 border-blue-500 text-white bg-blue-500"  type="submit">Cadastrar</Button>

        
        }
      </form>
    </Form>{
load&&
      <Button className="w-full mt-2" disabled>
            <Loader2 className="w-full flex  animate-spin" />

      </Button>
    }

        </>
    )
}