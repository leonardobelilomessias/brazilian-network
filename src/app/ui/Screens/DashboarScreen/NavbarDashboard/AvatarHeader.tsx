import { Avatar } from '@/components/ui/avatar';
import { useUserData } from '@/context/ContextUserAccont';
import Image from 'next/image';
import React from 'react';
import DefaultUserImage from '@/app/public/images/profile/default/avatar-default.jpg'
interface AvatarHeaderProps {
    name: string;
    avatarUrl: string;
}

export const AvatarHeader: React.FC = () => {
    const {dataUser} = useUserData()
    return (
    
            <Avatar className="w-[30px] h-[30px] relative"  >
                <Image alt='image user'  className='absolute' width={50} height={50} src={dataUser?.avatar_url||DefaultUserImage}/>
            </Avatar>

    );
};

