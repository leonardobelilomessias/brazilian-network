

import React from 'react';
import Image from 'next/image';
import { fetchTips } from './queries/queriesTips';
import { formatDate } from '@/app/util/FormatDate';


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
  

export async function  TipsSection(){
    const data  = await fetchTips() 
    const tips = data as Tip[]
    console.log(tips[0].created_by.name) 
  return (
    <div className="bg-white p-4 rounded-lg shadow-md container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">Top Dicas</h2>
        <button className="text-blue-500 hover:text-blue-700 text-sm">
          Ver Todas
        </button>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip) => (
          <div 
            key={tip.id} 
            className="border-b pb-3 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <h3 className="text-md font-semibold text-gray-800 mb-1">
              {tip.title}
            </h3>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatDate(tip.created_at).extendTime}</span>
              <span>criado por {tip.created_by.name}</span>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;