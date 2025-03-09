import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface User {
    id: string;
    name: string;
    user_name: string;
  }
  
  export interface Theme {
    id: string;
    name: string;
  }
  
  export interface Country {
    id: string;
    name: string;
  }
  
  export interface Tip {
    id: string;
    title: string;
    content: string;
    status: string;
    created_at: string;
    likes_count: number;
    image_url: string | null;
    created_by: User;
    theme_id: Theme;
    country_id: Country;
  }
  
  export interface DataTips { 
  tips: Tip[];
  userId: string | undefined;
  }

  export interface TipsSectionProps {
    data: DataTips;
    title: string;
    iconTitle: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  }