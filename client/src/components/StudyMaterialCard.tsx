import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, ExternalLink, Clock, Star } from "lucide-react";

interface StudyMaterialCardProps {
  title: string;
  platform: string;
  instructor?: string;
  duration?: string;
  rating?: number;
  isFree: boolean;
  price?: string;
  thumbnail?: string;
  url?: string;
  category?: string;
}

export function StudyMaterialCard({
  title,
  platform,
  instructor,
  duration,
  rating,
  isFree,
  price,
  thumbnail,
  url,
  category,
}: StudyMaterialCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200">
      <div className="relative aspect-video bg-muted">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-edu-primary to-edu-secondary">
            <PlayCircle className="h-16 w-16 text-white/80" />
          </div>
        )}
        {category && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            {category}
          </Badge>
        )}
        <Badge
          className={`absolute top-2 right-2 ${isFree ? "bg-green-600" : "bg-orange-600"}`}
        >
          {isFree ? "FREE" : price || "PAID"}
        </Badge>
      </div>
      <CardHeader className="pb-3">
        <h3 className="font-semibold line-clamp-2 text-sm" data-testid={`material-title`}>
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{platform}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {instructor && <span className="line-clamp-1">{instructor}</span>}
          <div className="flex items-center gap-2">
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={() => url && window.open(url, '_blank')}
          data-testid="button-view-material"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}
