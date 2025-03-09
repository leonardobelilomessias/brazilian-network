"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { z } from "zod"
import { useRouter } from "next/navigation";
import { Pencil, Save } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { IUser } from "@/app/types/types";

import {ptBR} from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { updateUserById } from "@/lib/supabase/queries/usersClient";
registerLocale('pt-BR', ptBR);


const formSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().nullable(),
  bio: z.string().optional(),
  origem: z.string().optional(),
  current_in: z.string().optional(),
});


export function FormProfile({ dataUser }: { dataUser: IUser }) {
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: dataUser.id,
      email: dataUser.email || "",
      name: dataUser.name || "",
      phone: dataUser.phone || "",
      bio: dataUser.bio || "",
      origem: dataUser.origem || "",
      current_in: dataUser.current_in || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const preparedData: IUser = {
        id: values.id,
        email: values.email,
        name: values.name,
        phone: values.phone || undefined,
        bio: values.bio,
        origem: values.origem,
        current_in: values.current_in,
      };

      await updateUserById(preparedData);
      setEdit(false);
      
      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso.",
        variant: "default",
      });
      
      router.refresh();
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro!",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-xl mb-3">Dados Pessoais</p>
        <Button className="bg-blue-500" onClick={() => setEdit(true)}>
          <Pencil size={16} className="mx-1" /> Editar Perfil
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Email</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder="Digite seu Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Nome</FormLabel>
                <FormControl>
                  <Input disabled={!edit} placeholder="Digite seu Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Telefone</FormLabel>
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Digite seu Telefone"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Biografia</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={!edit}
                    placeholder="Conte um pouco sobre você..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Origem</FormLabel>
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Cidade/Estado de origem"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="current_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Localização Atual</FormLabel>
                <FormControl>
                  <Input
                    disabled={!edit}
                    placeholder="Onde você está morando atualmente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-4">
            <Button 
              disabled={!edit} 
              className="flex bg-blue-500 hover:bg-blue-600" 
              type="submit"
            >
              <Save className="mr-2" /> Salvar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}