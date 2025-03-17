import { SearchX } from "lucide-react"

export function EmptyTips(){
    return(
        <div className=" my-4">
            <div className=" flex flex-col gap-2 items-center justify-center bg-blue-50 text-blue-500 text-center min-h-52">
                <SearchX size={38} className="text-blue-500"/>
                <p className="text-sm">Não foi encontrado nenhuma dica.</p>
            </div>
        </div>
    )
}