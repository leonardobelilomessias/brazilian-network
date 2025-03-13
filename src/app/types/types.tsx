import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface IFormInputFinance {
  renda?: number; // Agora os campos são opcionais
  entrada?: number;
  saldoFgts?: number;
  estadoCivil?: string;
  filhosDependentes?: string;
  trabalho3Anos?: string;
  primeiroImovel?: string;
  financiamento?: string;
  dataNascimento?: Date | null |string; // Agora é opcional
  tipoRenda?:string
}

export interface IUser {
  name?: string;
  phone?: string;
  email?: string;
  id: string;
  avatar_url?: string |null |undefined;
  bio?: string;
  origem?: string;
  current_in?: string;
  created_at?: Date;
  updated_at?: Date;

}


export interface IProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  origem: string;
  current_in: string;
  created_at: Date;
  updated_at: Date;
}



export interface INavigationElemets{ title: string, link: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> }