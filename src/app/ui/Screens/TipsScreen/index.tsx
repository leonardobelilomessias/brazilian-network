import React from 'react';
import Image from 'next/image';
import { fetchTips } from './queries/queriesTips';
import { formatDate } from '@/app/util/FormatDate';
import { TipsSection } from './TipsSections';

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
  

export async function TipsScreen() {
  const data = await fetchTips()
  const tips = data as Tip[]

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <TipsSection data={tips} />
    </div>
  );
};

