"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const questionSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  content: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
  theme_id: z.string(),
  country_id: z.string(),
});

export function CreateQuestionScreen() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
  });

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    try {
      // Implementar a lógica de criação da pergunta
      toast({
        title: "Sucesso!",
        description: "Sua pergunta foi publicada.",
      });
      router.push("/perguntas");
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Não foi possível publicar sua pergunta.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Fazer uma Nova Pergunta</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da Pergunta</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o título da sua pergunta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Descreva sua pergunta em detalhes..." 
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-500">
              Publicar Pergunta
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 