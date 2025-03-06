import { Bell, BookText, BriefcaseBusiness, CalendarDays, CircleHelp, Flag, Folder, HandHelping, Heart, Hotel, House, HousePlus, Lightbulb, List, ListCollapse, MessageCircleQuestion, MessageSquareQuoteIcon, Quote, QuoteIcon, Radar, Rocket, Settings, Store, TvMinimalPlay, User, User2, Users } from "lucide-react";

export const navigationElementsAccount = [
  { title: 'Home', link: '/dashboard', icon: House  },
  { title: 'Perfil', link: "/perfil", icon: User2 },
  { title: 'Configurações', link: "/configuracoes", icon: Settings },


];

export const navigationElementsTools = [
  // { title: 'Todos', link: '/apartamentos', icon: Hotel },
  // { title: 'Lancamentos', link: "/lancamentos", icon: Rocket }, 
  { title: 'lojas', link: "/lojas", icon: Store }, 
  { title: 'serviços', link: "/servicos", icon: HandHelping }, 
  { title: 'Vagas de Trabalho', link: "/vagas-de-trabalho", icon: BriefcaseBusiness }, 
  { title: 'Eventos', link: "/eventos", icon: CalendarDays }, 




];
export const navigationElementsCommunity= [
  { title: 'Dicas', link: "/dicas", icon: Lightbulb },
  { title: 'Dúvidas', link: "/duvidas", icon: CircleHelp },
  { title: 'Grupos', link: '/grupos', icon: Users },
  { title: 'Ebooks', link: "/ebooks", icon: BookText }, 
  // { title: 'Depoimentos', link: "/depoimentos", icon: MessageSquareQuoteIcon },
  { title: 'Videos', link: '/videos', icon: TvMinimalPlay },


];



export const navigationDev = [
  { title: 'Listar Produtos', link: '/lista', icon: List },
  { title: 'Novo Imovel', link: "/novo", icon: HousePlus },
];