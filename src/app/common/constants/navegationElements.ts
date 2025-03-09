import { Bell, BookText, BriefcaseBusiness, CalendarDays, CircleHelp, Flag, Folder, HandHelping, Heart, Hotel, House, HousePlus, Lightbulb, List, ListCollapse, MessageCircleQuestion, MessageSquareQuoteIcon, Quote, QuoteIcon, Radar, Rocket, Settings, Store, TvMinimalPlay, User, User2, Users } from "lucide-react";

export const navigationElementsAccount = [
  { title: 'Home', link: '/dashboard', icon: House , status:"Novo" },
  { title: 'Perfil', link: "/perfil", icon: User2, status:"Novo" },
  { title: 'Configurações', link: "/configuracoes", icon: Settings, status:"Novo" },


];

export const navigationElementsTools = [
  // { title: 'Todos', link: '/apartamentos', icon: Hotel },
  // { title: 'Lancamentos', link: "/lancamentos", icon: Rocket }, 
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