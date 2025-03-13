import { ITip } from "@/app/types/TypesDB";

interface TipCardProps {
  tip: ITip;
}

export const TipCard = ({ tip }: TipCardProps) => {
  return (
    <div>
      <h3>{tip.title}</h3>
      <p>{tip.content}</p>
      {tip.profile && (
        <div>
          <img src={tip.profile.avatar_url || ''} alt={tip.profile.user_name || ''} />
          <span>{tip.profile.user_name}</span>
        </div>
      )}
      {tip.theme && <span>{tip.theme.name}</span>}
      {tip.country && <span>{tip.country.code}</span>}
    </div>
  );
}; 