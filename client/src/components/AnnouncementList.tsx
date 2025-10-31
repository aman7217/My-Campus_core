import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

const PRIORITY_COLORS = {
  high: "bg-red-600",
  medium: "bg-orange-600",
  low: "bg-blue-600",
  default: "bg-gray-600",
} as const;

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
  const getPriorityColor = (priority?: Announcement["priority"]) => {
    return PRIORITY_COLORS[priority ?? "default"];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span>Announcements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No announcements at this time.
          </p>
        ) : (
          <ul className="space-y-3" role="list">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="border-l-4 border-l-primary bg-muted/30 rounded-md p-3 hover-elevate"
                data-testid={`announcement-${announcement.id}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{announcement.title}</h4>
                  {announcement.priority && (
                    <Badge
                      className={`${getPriorityColor(
                        announcement.priority
                      )} text-xs`}
                    >
                      {announcement.priority}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {announcement.content}
                </p>
                <time className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  <span>{announcement.date}</span>
                </time>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
