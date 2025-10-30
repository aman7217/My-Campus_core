import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function CampusMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Campus Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <svg
          viewBox="0 0 600 300"
          className="w-full h-auto rounded-md bg-muted/30"
          data-testid="campus-map-svg"
        >
          {/* Admin Block */}
          <rect
            x="20"
            y="20"
            width="180"
            height="120"
            rx="8"
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="hover:fill-primary/10 transition-colors cursor-pointer"
          />
          <text x="30" y="50" fontSize="14" fill="hsl(var(--foreground))" fontWeight="600">
            Admin Block
          </text>
          <text x="30" y="70" fontSize="12" fill="hsl(var(--muted-foreground))">
            Office, Reception
          </text>

          {/* Library */}
          <rect
            x="220"
            y="20"
            width="180"
            height="120"
            rx="8"
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="hover:fill-primary/10 transition-colors cursor-pointer"
          />
          <text x="230" y="50" fontSize="14" fill="hsl(var(--foreground))" fontWeight="600">
            Library
          </text>
          <text x="230" y="70" fontSize="12" fill="hsl(var(--muted-foreground))">
            Study Hall, Books
          </text>

          {/* Labs Block */}
          <rect
            x="420"
            y="20"
            width="160"
            height="220"
            rx="8"
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="hover:fill-primary/10 transition-colors cursor-pointer"
          />
          <text x="430" y="50" fontSize="14" fill="hsl(var(--foreground))" fontWeight="600">
            Labs Block
          </text>
          <text x="430" y="70" fontSize="12" fill="hsl(var(--muted-foreground))">
            IT Lab
          </text>
          <text x="430" y="90" fontSize="12" fill="hsl(var(--muted-foreground))">
            Chemistry Lab
          </text>
          <text x="430" y="110" fontSize="12" fill="hsl(var(--muted-foreground))">
            Physics Lab
          </text>

          {/* Canteen */}
          <circle
            cx="110"
            cy="200"
            r="40"
            fill="hsl(var(--card))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="hover:fill-primary/10 transition-colors cursor-pointer"
          />
          <text x="80" y="205" fontSize="12" fill="hsl(var(--foreground))" fontWeight="600">
            Canteen
          </text>

          {/* Sports Ground */}
          <rect
            x="220"
            y="160"
            width="180"
            height="80"
            rx="8"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="hover:fill-primary/10 transition-colors cursor-pointer"
          />
          <text x="230" y="200" fontSize="14" fill="hsl(var(--foreground))" fontWeight="600">
            Sports Ground
          </text>
        </svg>
      </CardContent>
    </Card>
  );
}
