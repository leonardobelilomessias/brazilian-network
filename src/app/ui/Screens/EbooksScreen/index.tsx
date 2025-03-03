'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { BookOpenText, BookText, CalendarDays, Download, TvMinimalPlay } from "lucide-react";
import Image from "next/image";


export function EbookScreen(){
    const downloadPDF = () => {
        const link = document.createElement("a");
        link.href = "https://www.caixa.gov.br/Downloads/caixa-cartilhas/cartilha-como-comprar-imoveis-caixa.pdf";
        link.download = "caixa.pdf";
        link.click();
      };
    const elemtsBooks = [{
        title:"Como financiar seu primeiro imovel",link:"/video/aoksd",category:"fin"},
        {title:"Documentos para o financiamento",link:"/video/aoksd", category:"fin"},
        {title:"partamento tipo vs Area Privativa",link:"/video/aoksd", category:"con"},
        {title:"Qual melhor posição do apartamento",link:"/video/aoksd", category:"con"},
        {title:"São gabriel coração de BH",link:"/video/aoksd", category:"rai"},
        {title:"Nova pampulha - perto de tudo ",link:"", category:"rai"},
        {title:"Como fazer uma grana extra para o ape",link:"", category:"dic"},
        {title:"Melhores planos de pagamento",link:"", category:"dic"},
      ]
    return(
        <div className="sm:container pt-10 mx-2">
            <Card className="mt-4">
                <CardHeader>
                <CardTitle className="flex gap-5">
                    <BookText/>
                    Ebooks
                </CardTitle>
                <CardDescription>
                    Melhores Ebooks para você está por dentro do tudo!
                </CardDescription>
                <div className="flex sm:flex-row  flex-wrap gap-10 justify-center m-auto">
                {
                                elemtsBooks.map((element)=>(
                                    <div key={element.title} className="w-[250px] ">

                                    <div className="w-[250px] h-[300px] relative " >
                                        <Image style={{borderRadius:4}} src="https://github.com/shadcn.png" alt="img" fill />
                                    </div>
            
                                    <p className=" h-[56px] text-md px-2  text-center font-bold text-wrap truncate">{element.title}  </p>
                                    <div className="flex gap-2">
                                        <ShowResume/>
                                        <Button onClick={()=>downloadPDF()} className="w-full gap-1 bg-primaryPalet" > <Download size={18}/> Baixar</Button>
                                    </div>
                                </div>
                                ))
                            }
                </div>
                <CardContent>
                    
                </CardContent>
                </CardHeader>
                <CardFooter>
                </CardFooter>
                
            </Card>

        </div>
    )
}


function ShowResume() {
    return (
      <Dialog>
        <DialogTrigger asChild>
        <Button variant={'outline'} onClick={()=>console.log("resumo do ebook")} className="w-full gap-1 " > <BookOpenText size={18}/> Ver Resumo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
          <DialogTitle>Resumo</DialogTitle>
            <DialogDescription>
{`Lorem Ipsum is simply dummy 
text of the printing and typesetting industry. Lorem Ipsum has been
 the industry's standard dummy text ever since the 1500s, when an unknown
  printer took a galley of type and scrambled it to make a type specimen book.
   It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
     sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
     Aldus PageMaker including versions of Lorem Ipsum.`}            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  