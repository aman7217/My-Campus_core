import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

interface TimetableCardProps {
  day: string;
  classes: {
    code: string;
    title: string;
    time: string;
    room: string;
    teacher?: string;
  }[];
}

const subjectColors: Record<string, string> = {
  Java: "border-l-purple-600",
  "E-COMM": "border-l-blue-600",
  MP: "border-l-green-600",
  SE: "border-l-orange-600",
  AAD: "border-l-red-600",
  ADD: "border-l-emerald-600",
};

export function TimetableCard({ day, classes }: TimetableCardProps) {
  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-primary">{day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No classes today</p>
        ) : (
          classes.map((cls, idx) => (
            <div
              key={idx}
              className={`bg-muted/50 border-l-4 ${subjectColors[cls.title] || "border-l-blue-500"} rounded-md p-3 hover:bg-muted transition-colors`}
              data-testid={`class-${cls.title.toLowerCase()}-${idx}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm">{cls.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {cls.code}
                </Badge>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{cls.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{cls.room}</span>
                </div>
                {cls.teacher && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{cls.teacher}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
