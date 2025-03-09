import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import AvatarDefault from '@/app/public/images/profile/default/avatar-default.jpg';
import { EditIcon } from 'lucide-react';

interface ProfileHeaderProps {
  user: {
    name: string;
    avatar?: string;
    origem: string;
    current_in: string;
    bio: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow rounded-lg p-6 mb-6 relative">
      <Avatar className="w-32 h-32 md:w-40 md:h-40 mr-0 md:mr-8 mb-4 md:mb-0">
        <Image src={user.avatar || AvatarDefault} alt={user.name} />
        <AvatarFallback className="bg-blue-500 text-white">
          {user.name[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-center md:text-left flex-grow">
        <h1 className="text-lg md:text-xl font-bold text-blue-600">{user.name}</h1>
        <p className="text-gray-600 text-base">Origem: {user.origem}</p>
        <p className="text-gray-600 text-base">Atualmente em: {user.current_in}</p>
        <p className="text-sm text-gray-500">{user.bio}</p>
      </div>
      <button className="absolute top-4 right-4 text-blue-600 hover:underline">
        <EditIcon size={16} className="inline-block mr-1" /> Editar Perfil
      </button>
    </div>
  );
};

export default ProfileHeader; 