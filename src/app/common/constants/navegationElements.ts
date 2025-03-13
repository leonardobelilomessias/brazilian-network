import { BadgeDollarSign, Bell, BookText, BriefcaseBusiness, CalendarDays, CircleDollarSign, CircleHelp, DollarSignIcon, Flag, Folder, HandHelping, Heart, Hotel, House, HousePlus, Info, Lightbulb, List, ListCollapse, MessageCircleQuestion, MessageSquareQuoteIcon, Quote, QuoteIcon, Radar, Rocket, Settings, Store, TvMinimalPlay, User, User2, Users } from "lucide-react";


export const navigationElements = [{
  title: 'Dashboard',
  items: [
    { title: 'Home', link: '/dashboard', icon: House , status:"Novo" },
    { title: 'Perfil', link: "/perfil", icon: User2, status:"Novo" },   
    { title: 'Dicas', link: "/dicas", icon: Lightbulb, status:"Novo" },
    { title: 'Dúvidas', link: "/duvidas", icon: CircleHelp, status:"Novo" },
    { title: 'Contribua', link: "/contribua", icon: BadgeDollarSign, status:"Novo" },
    { title: 'Informaçoes', link: "/informaçoes", icon: Info, status:"Novo" },


    // { title: 'Eventos', link: "/eventos", icon: CalendarDays , status:"Em breve"}, 
    // { title: 'Configurações', link: "/configuracoes", icon: Settings, status:"Novo" },
    // { title: 'lojas', link: "/lojas", icon: Store , status:"Em breve"}, 
    // { title: 'serviços', link: "/servicos", icon: HandHelping,status:"Em breve" }, 
    // { title: 'Vagas de Trabalho', link: "/vagas-de-trabalho", icon: BriefcaseBusiness, status:"Em breve" }, 
    // { title: 'Grupos', link: '/grupos', icon: Users,status:"Em breve" },
    // { title: 'Ebooks', link: "/ebooks", icon: BookText ,status:"Em breve"},
    // { title: 'Videos', link: '/videos', icon: TvMinimalPlay,status:"Em breve" },
  ]
}]
export const navigationElementsAccount = [
  { title: 'Home', link: '/dashboard', icon: House , status:"Novo" },
  { title: 'Perfil', link: "/perfil", icon: User2, status:"Novo" },
  { title: 'Configurações', link: "/configuracoes", icon: Settings, status:"Novo" },


];

export const navigationElementsTools = [
  { title: 'lojas', link: "/lojas", icon: Store , status:"Em breve"}, 
  { title: 'serviços', link: "/servicos", icon: HandHelping,status:"Em breve" }, 
  { title: 'Vagas de Trabalho', link: "/vagas-de-trabalho", icon: BriefcaseBusiness, status:"Em breve" }, 
  { title: 'Eventos', link: "/eventos", icon: CalendarDays , status:"Em breve"}, 




];
export const navigationElementsCommunity= [
  { title: 'Dicas', link: "/dicas", icon: Lightbulb, status:"Novo" },
  { title: 'Dúvidas', link: "/duvidas", icon: CircleHelp, status:"Novo" },
  { title: 'Grupos', link: '/grupos', icon: Users,status:"Em breve" },
  { title: 'Ebooks', link: "/ebooks", icon: BookText ,status:"Em breve"}, 
  // { title: 'Depoimentos', link: "/depoimentos", icon: MessageSquareQuoteIcon },
  { title: 'Videos', link: '/videos', icon: TvMinimalPlay,status:"Em breve" },


];



export const navigationDev = [
  { title: 'Listar Produtos', link: '/lista', icon: List, },
  { title: 'Novo Imovel', link: "/Novo", icon: HousePlus },
];