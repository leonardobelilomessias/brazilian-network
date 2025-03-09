'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProfile } from '../FormProfile';
import { AvatarUpload } from '../components/AvatarUpload';


interface UserProfile {
    name: string;
    email: string;
    id: string;
    avatar_url?: string;
    // Add other profile fields as needed   
}

const EditProfile: React.FC<{ user: UserProfile }> = ({ user }) => {
  
  return (
    <div className='max-w-4xl mx-auto py-8 px-4'>
      <div className="mb-8">
        <AvatarUpload
          userId={user.id}
          avatarUrl={user.avatar_url}
          userName={user.name}
        />
      </div>
      <FormProfile dataUser={user} />
    </div>
  );
};

export default EditProfile;