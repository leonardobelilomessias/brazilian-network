import { fetchTips } from '@/lib/supabase/queries/server/Tips';
import ProfileHeader from './components/ProfileHeader';
import TopTipsList from '../Feed/TopTipsList';
import GenericTipList from '../../components/GenericListTips';
import { Lightbulb } from 'lucide-react';



export const ProfileScreen = async ({user}:{user:any}) => {
  const tips = await fetchTips()
  return (
    <div className="p-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader user={user} />
        <GenericTipList items={{tips,icon:Lightbulb, linkButton:"/dicas", title:"Dicas"}} />





      </div>
    </div>
  );
};
