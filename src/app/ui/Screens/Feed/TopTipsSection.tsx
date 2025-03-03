import React from 'react';

export default function TopTipsSection() {
  const tips = [
    {
      id: 1,
      title: "Como conseguir sua nacionalidade em Portugal",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 2,
      title: "Intercambio na Irlanda com direito a trabalho",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 3,
      title: "Como trabalhar como autonomo em Sidney Australia",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    },
    {
      id: 4,
      title: "Melhor estrategia para quem tem direito de cidadania Italiana",
      date: "20/02/2025",
      time: "09:45",
      author: "@exemplousuario"
    }
  ];
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2">🔍</span>
        <h2 className="text-xl font-semibold">Top Dicas</h2>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-blue-800 mb-1">{tip.title}</h3>
            <p className="text-xs text-gray-500">
              Criado em {tip.date} às {tip.time} por <span className="text-blue-500">{tip.author}</span>
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
          Ver todas
        </button>
      </div>
    </div>
  );
}