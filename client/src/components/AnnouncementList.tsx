import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority?: "high" | "medium" | "low";
}

interface AnnouncementListProps {
  announcements: Announcement[];
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-orange-600";
      case "low":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">No announcements at this time.</p>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="border-l-4 border-l-primary bg-muted/30 rounded-md p-3 hover-elevate"
              data-testid={`announcement-${announcement.id}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-semibold text-sm">{announcement.title}</h4>
                {announcement.priority && (
                  <Badge className={`${getPriorityColor(announcement.priority)} text-xs`}>
                    {announcement.priority}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {announcement.content}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{announcement.date}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
