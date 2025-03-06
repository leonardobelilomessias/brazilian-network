import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Video, BookOpen, Calendar, Store, FileText, Briefcase, Users, HelpCircle, AlignJustify } from 'lucide-react';

interface Engagement {
  title: string;
  date: string;
  author: string;
}

interface VideoItem {
  title: string;
  thumbnail: string;
}

interface Question {
  title: string;
  date: string;
}

export const ProfileScreen = () => {
  const engagements: Engagement[] = [
    {
      title: "Como conseguir sua nacionalidade em Portugal",
      date: "20/02/2025 às 09:45",
      author: "desenvolvimentouser"
    },
    {
      title: "Intercâmbio na Irlanda com direito a trabalho",
      date: "20/02/2025 às 09:45",
      author: "desenvolvimentouser"
    },
    {
      title: "Como trabalhar como autônomo em Sidney, Australia",
      date: "20/02/2025 às 09:45",
      author: "desenvolvimentouser"
    },
    {
      title: "Melhor estratégia para quem tem direito de cidadania Italiana",
      date: "20/02/2025 às 09:45",
      author: "desenvolvimentouser"
    }
  ];

  const videos: VideoItem[] = [
    { title: "Estratégias de Viagem", thumbnail: "/placeholder-1.jpg" },
    { title: "Viajar para o Japão", thumbnail: "/placeholder-2.jpg" },
    { title: "Valencia", thumbnail: "/placeholder-3.jpg" },
    { title: "Travel Vlog", thumbnail: "/placeholder-4.jpg" }
  ];

  const questions: Question[] = [
    { 
      title: "Qual a melhor estratégia para imigrar para Europa?", 
      date: "20/02/2025 às 09:45" 
    },
    { 
      title: "Portugal está permitindo regularização de turistas?", 
      date: "20/02/2025 às 09:45" 
    },
    { 
      title: "Quanto em média eu preciso para imigrar com minha família?", 
      date: "20/02/2025 às 09:45" 
    },
    { 
      title: "Qual a cidade com melhor oferta de emprego na Irlanda", 
      date: "20/02/2025 às 09:45" 
    }
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center bg-white shadow rounded-lg p-6 mb-6">
          <img 
            src="/api/placeholder/120/120" 
            alt="Profile" 
            className="w-24 h-24 rounded-full mr-6" 
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Leonardo Bello</h1>
            <p className="text-gray-600">Origem: Belo Horizonte, Minas gerais</p>
            <p className="text-gray-600">Atualmente em: Watford, Inglaterra</p>
            <p className="text-sm text-gray-500">A melhor forma de prever o futuro é criá-lo</p>
          </div>
        </div>

        {/* Engagement Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlignJustify className="mr-2" /> Engajamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {engagements.map((engagement, index) => (
              <div key={index} className="border-b py-2 last:border-b-0">
                <h3 className="font-medium">{engagement.title}</h3>
                <p className="text-sm text-gray-500">
                  Criado em {engagement.date} por {engagement.author}
                </p>
              </div>
            ))}
            <button className="text-blue-600 mt-4 hover:underline">Ver todas</button>
          </CardContent>
        </Card>

        {/* Videos Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="mr-2" /> Vídeos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {videos.map((video, index) => (
                <div key={index} className="border rounded overflow-hidden">
                  <img 
                    src={`/api/placeholder/300/200`} 
                    alt={video.title} 
                    className="w-full h-32 object-cover" 
                  />
                  <p className="p-2 text-sm text-center">{video.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2" /> Últimas Perguntas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {questions.map((question, index) => (
              <div key={index} className="border-b py-2 last:border-b-0">
                <h3 className="font-medium">{question.title}</h3>
                <p className="text-sm text-gray-500">
                  Criado em {question.date}
                </p>
              </div>
            ))}
            <button className="text-blue-600 mt-4 hover:underline">Ver todas</button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

