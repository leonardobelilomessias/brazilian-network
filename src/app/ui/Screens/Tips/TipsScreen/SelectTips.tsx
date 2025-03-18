'use client'
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabaseClient } from "@/lib/supabase/client";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { usePathname, useSearchParams, useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import WorldFlag from 'react-world-flags';
import { useSelectStoreContryTips, useSelectStoreThemeTips } from "./stores/selectStore";


export function SelectGroupTips() {
  const { selectedValueThemeTips, setSelectedValueThemeTips } = useSelectStoreThemeTips();
  const {selectedValueCountryTips, setSelectedValueCountryTips} = useSelectStoreContryTips()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch({theme,country}:{theme: string, country:string}) {
    const params = new URLSearchParams(searchParams);
    if (theme) {
      params.set('theme', theme)
    } else {
      params.delete('theme');
    }
    if (country) {
      params.set('country', country)
    } else {
      params.delete('country');
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(`${pathname}?${params.toString()}`)
  }
  function cleanFilters(){
    setSelectedValueCountryTips('')
    setSelectedValueThemeTips('')
    handleSearch({country:"",theme:""})
  }
  useEffect(()=>{
    // handleSearch({theme:selectedValueTheme,country:selectedValueCountry})
    return ()=> {setSelectedValueThemeTips('') 
      setSelectedValueCountryTips('')}
  },[])
    return (
        <div className=" px-4 py-2">
            <div className="flex items-center"><SlidersHorizontal size={14} /> <p className="text-sm">Filtros</p></div>
            <div className="flex gap-4 align-bottom items-end  mt-1">
                <SelectTheme title="Tema"/>
                <SelectCountry title="Pais" />
                <Button onClick={()=>cleanFilters()}  size={'sm'} className="  text-sm border-blue-500 bg-white border flex gap-2 hover:bg-blue-300 hover:text-blue-50 hover:border-white text-blue-500 "> <p>Limpar</p> </Button>
                <Button onClick={()=>handleSearch({theme:selectedValueThemeTips,country:selectedValueCountryTips})}  size={'sm'} className="  text-sm border-blue-500 bg-white border flex gap-2 hover:bg-blue-300 hover:text-blue-50 hover:border-white text-blue-500 "> <Search size={16} /><p>Filtrar</p> </Button>
            </div>
        </div>
    );
};

type countries = {
    name: string
    code: string
    id: string
  }
  
  


export function SelectCountry({title}:{title:string}) {
  const { selectedValueCountryTips, setSelectedValueCountryTips } = useSelectStoreContryTips();
    const [countries, setcountries] = useState([] as countries[])
    async function getCountries() {
      const { data, error } = await supabaseClient()
        .from('countries',)
        .select('*') // Ou especifique as colunas: .select('id, name')
        .order('name', { ascending: true }) // Ordena pelo nome
      // .limit(20); // Retorna apenas 20 resultados
      console.log(data)
      if (error) {
        console.error('Erro ao buscar países:', error);
        return [];
      }
      setcountries(data)
      return data;
    }
    useEffect(() => {
      getCountries()
    }, [])
    const handleChange = (e:string) => {
      setSelectedValueCountryTips(e); // Atualiza o estado global
    }
    return (
      <Select  value={selectedValueCountryTips}  onValueChange={(e)=>handleChange(e)}>
      
        <SelectTrigger className="w-[180px]"  >
          <SelectValue placeholder={`Filtrar por ${title}`} />
        </SelectTrigger>
        <SelectContent    >
        {countries.map((country, key) => (
                  <SelectItem  className='flex flex-row  cursor-pointer hover:bg-blue-50' style={{ display: "flex" }} key={country.id} value={country.name as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <WorldFlag style={{ marginRight: '8px', width: '20px', height: '17px', display: 'flex', }} code={country.code} />
                      <p className=''>{country.name}</p>
                    </div>
                  </SelectItem>))}
        </SelectContent>
      </Select>
    )
  }

  
  export function SelectTheme({title}:{title:string}) {
    const { selectedValueThemeTips, setSelectedValueThemeTips} = useSelectStoreThemeTips();
      const [themes, setThemes] = useState([] as countries[])
      async function getThemes() {
        const { data, error } = await supabaseClient()
          .from('themes')
          .select('*') // Ou especifique as colunas: .select('id, name')
          .order('name', { ascending: true }) // Ordena pelo nome
        // .limit(20); // Retorna apenas 20 resultados
        if (error) {
          console.error('Erro ao buscar países:', error);
          return [];
        }
        setThemes(data)
        return data;
      }
      useEffect(() => {
        getThemes()
      }, [])
      const handleChange = (e:string) => {
        setSelectedValueThemeTips(e); // Atualiza o estado global
      }
    return (
      <Select value={selectedValueThemeTips} onValueChange={(e)=> handleChange(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Filtrar por ${title}`} />
        </SelectTrigger>
        <SelectContent>
        {themes.map((theme, key) => (
                  <SelectItem key={theme.id} className='flex flex-row  cursor-pointer hover:bg-blue-50' style={{ display: "flex" }} value={theme.name as string}>
                    <div className='flex align-middle justify-center items-center'>
                      <p className=''>{theme.name}</p>
                    </div>
                  </SelectItem>))}
        </SelectContent>
      </Select>
    )
  }


