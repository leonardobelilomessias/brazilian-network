import { formInputFinance } from "@/app/mocks/fakeDatabase";
import { IFormInputFinance } from "@/app/types/types";
import { formatPriceToBRL } from "@/app/util/formatPrice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getFinanceProfile } from "@/lib/firebase/getFinanceProfile";
import { getUserById } from "@/lib/firebase/getUserById";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { PricePowerBuy } from "./PricePowerBuy";


export default async  function TableDataFinance(){
    const dataFinanceProfile = await getUserById() as IFormInputFinance
    console.log(dataFinanceProfile)
    const nascimento = Number(String(dataFinanceProfile?.dataNascimento).split('/')[2])
    const handspay = dataFinanceProfile?.entrada?dataFinanceProfile.entrada:0
    const fgts = dataFinanceProfile?.saldoFgts?dataFinanceProfile.saldoFgts:0
    const renda = dataFinanceProfile?.renda?dataFinanceProfile.renda:0
    const amountpercent = calcAmountPercent(renda)
    const percent = (renda/100) * amountpercent
    const sub = calcSub(renda)
    function calcSub(amount:number){
        if(amount<=2200 && dataFinanceProfile?.filhosDependentes=="sim" ) return 40000
        if(amount<=2800 && dataFinanceProfile?.filhosDependentes=="sim" ) return 20000
        if(amount<=3200 && dataFinanceProfile?.filhosDependentes=="sim" ) return 5000
        if(amount<=3800 && dataFinanceProfile?.filhosDependentes=="sim" ) return 5000

        return 1000
    }
    function calcAmountPercent(amount:number){
        if(amount<=2800) return 30
        if(amount<= 3200) return 30
        if(amount<= 4200) return 25
        if(amount<= 5200) return 22
        return 22
        
    }
    function calcPower(){
        
        if(nascimento>=1989){
            const resultYear = percent * 12
            const resultAllYears = resultYear  * 35
            const finalResult = resultAllYears + fgts+ handspay +sub
            // setPower(finalResult/1.8)
            return finalResult /1.8
        }
        if(nascimento>=1979){
            const resultYear = dataFinanceProfile?.renda?dataFinanceProfile.renda:0*12
            const resultAllYears = resultYear * 30
            const finalResult = resultAllYears + fgts+ handspay
            // setPower(finalResult/1.8)
            return finalResult
        }
        if(nascimento<=1969){
            const resultYear = dataFinanceProfile?.renda?dataFinanceProfile.renda:0*12
            const resultAllYears = resultYear * 25
            const finalResult = resultAllYears + fgts+ handspay
            // setPower(finalResult/1.8)
            return finalResult
        }
        // setPower(49000)
        return 40000
    }
    const power = calcPower()
    return(
        <div>
<Card className="mb-10">
    
  <CardHeader>
    <CardTitle>Perfil de Compra</CardTitle>
    <CardDescription>
        Os calculos são feitos automaticamento por uma inteligência artificial com base nos seus DashboardScreen
        e as informaçoes de mercado 
    </CardDescription>
  </CardHeader>
  {/* <div className="flex flex-col  lg:flex-row">
        <CardContent >
                        <TypographyField value={String(formatPriceToBRL(dataFinanceProfile?.renda as number))}>Renda:</TypographyField>
                        <TypographyField value={String(formatPriceToBRL( dataFinanceProfile?.entrada as number))}>Entrada:</TypographyField>
                        <TypographyField value={String(formatPriceToBRL( dataFinanceProfile?.saldoFgts as number ))}>Saldo Fgts:</TypographyField>
                        <TypographyField value={dataFinanceProfile?.tipoRenda}>Tipo de renda:</TypographyField>
                        <TypographyField value={dataFinanceProfile?.filhosDependentes}>Filhos ou dependentes:</TypographyField>

        </CardContent>
        <CardContent>
        <TypographyField value={dataFinanceProfile?.estadoCivil}>Estado Civil:</TypographyField>
                        <TypographyField value={String(dataFinanceProfile?.dataNascimento)}>Data de nascimento:</TypographyField>
                        <TypographyField value={dataFinanceProfile?.trabalho3Anos}>Trabalhou 3 anos CLT:</TypographyField>
                        <TypographyField value={dataFinanceProfile?.financiamento}>Possui financiamento:</TypographyField>
                        <TypographyField value={dataFinanceProfile?.primeiroImovel}>Primeiro Imóvel:</TypographyField>
        </CardContent>
  </div> */}
  <CardFooter className="flex p-6  bg-blue-100 items-center justify-center sm:justify-start">
    <div className="flex  flex-col sm:flex-row wrap  gap-3 items-center sm:justify-center">
        <h3 className=" flex   text-2xl font-semibold tracking-tight min-w-[180px] md:min-w-[300px] ">Potencial de Compra:</h3>
        <PricePowerBuy value={power}/>
        <Link href={'/perfil'} className="sm:ml-10">
            <Button className="bg-primaryPalet">Editar Perfil</Button>
        </Link>
    </div>
  </CardFooter>
</Card>
        </div>

    )
}

function TypographyField({children,value}:{children:ReactNode,value?:string}){
    return(
        <div style={{display:"flex", alignItems:"center",alignContent:"center",justifyItems:"center",marginBottom:"18px" }}>
            <p className="min-w-[180px] md:min-w-[300px] text-gray-600 " > {children}</p>
            <p className="text-primaryPalet font-semibold">{value?value:"Sem informações"}</p>
        </div>
    )
}