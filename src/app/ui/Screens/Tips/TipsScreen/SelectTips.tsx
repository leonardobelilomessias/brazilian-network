import { Button } from "@/components/ui/button";
import { Filter, Search, SlidersHorizontal } from "lucide-react";


export function SelectGroup() {
    return (
        <div>
            <div className="flex items-center"><SlidersHorizontal size={14} /> <p className="text-sm">Filtros</p></div>
            <div className="flex gap-4 align-bottom items-end ">
                <Select title="Tema" />
                <Select title="País" />
                <Button size={'sm'} className=" bg-blue-500 text-sm  flex gap-2 "> <Search size={16} /><p>Filtrar</p> </Button>
            </div>
        </div>
    );
};

function Select({ title }: { title: string }) {
    return (
        <div className="">
            {/* <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700">{title}</label> */}
            <select id="theme-select" className="mt-1 block w-full border p-2 bg-white border-gray-300 rounded-md text-sm shadow-sm focus:ring focus:ring-opacity-50">
                <option className="" value="">Selecione um {title}</option>
                <option value="tema1">{title} 1</option>
                <option value="tema2">{title} </option>
                <option value="tema3">{title} </option>
            </select>
        </div>
    )
}