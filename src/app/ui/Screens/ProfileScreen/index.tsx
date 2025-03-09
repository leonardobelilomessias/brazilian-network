import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Video, BookOpen, Calendar, Store, FileText, Briefcase, Users, HelpCircle, AlignJustify } from 'lucide-react';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarDefault from '@/app/public/images/profile/default/avatar-default.jpg';
import EventImageDefault from '@/app/public/images/profile/default/size_120.png'
import VideoImageDefault from '@/app/public/images/profile/default/sizxe_300_200.png'
import Image, { StaticImageData } from 'next/image';
import ProfileHeader from './components/ProfileHeader';

interface Engagement {
  title: string;
  date: string;
  author: string;
}

interface VideoItem {
  title: string;
  thumbnail: StaticImageData;
}

interface Question {
  title: string;
  date: string;
}

export const ProfileScreen = ({user}:{user:any}) => {
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
    { title: "Estratégias de Viagem", thumbnail: VideoImageDefault },
    { title: "Viajar para o Japão", thumbnail: VideoImageDefault },
    { title: "Valencia", thumbnail: VideoImageDefault },
    { title: "Travel Vlog", thumbnail:VideoImageDefault }
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
        <ProfileHeader user={user} />

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
        <VideoCarrousel videos={videos} />

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

function VideoCarrousel({videos}: {videos: VideoItem[]}) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2" /> Vídeos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto space-x-4">
          {videos.map((video, index) => (
            <div key={index} className="border rounded overflow-hidden min-w-[200px]">
              <Image
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              <p className="p-2 text-sm text-center">{video.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}