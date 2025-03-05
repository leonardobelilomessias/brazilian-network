import Image from 'next/image';
import { Badge } from "@/components/ui/badge";

interface TipContentProps {
  imageUrl?: string;
  title: string;
  content: string;
  themeName: string;
  countryName: string;
}

export function TipContent({ imageUrl, title, content, themeName, countryName }: TipContentProps) {
  return (
    <div className="space-y-6">
      {imageUrl && (
        <div className="rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-lg text-muted-foreground whitespace-pre-wrap">{content}</p>

      <div className="flex items-center gap-2">
        <Badge variant="secondary">{themeName}</Badge>
        <Badge variant="secondary">{countryName}</Badge>
      </div>
    </div>
  );
} 