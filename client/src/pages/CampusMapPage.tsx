import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Location {
  id: string;
  name: string;
  code: string;
  description: string;
  category: "academic" | "administrative" | "facility" | "residential";
  coordinates: { x: number; y: number };
}

const locations: Location[] = [
  {
    id: "1",
    name: "Admin Block",
    code: "88",
    description: "Administrative offices, principal's office, and main reception",
    category: "administrative",
    coordinates: { x: 20, y: 30 },
  },
  {
    id: "2",
    name: "CSE/IT Block",
    code: "15",
    description: "Computer Science and IT classrooms and labs",
    category: "academic",
    coordinates: { x: 40, y: 40 },
  },
  {
    id: "3",
    name: "Library (NT)",
    code: "38 & 32",
    description: "Study materials, books, and reading rooms",
    category: "facility",
    coordinates: { x: 30, y: 50 },
  },
  {
    id: "4",
    name: "Main Auditorium",
    code: "16",
    description: "Events, seminars, and gatherings",
    category: "facility",
    coordinates: { x: 60, y: 35 },
  },
  {
    id: "5",
    name: "Girls Hostel",
    code: "41",
    description: "Residential accommodation for female students",
    category: "residential",
    coordinates: { x: 80, y: 60 },
  },
  {
    id: "6",
    name: "NIT Boys Hostel",
    code: "NIT",
    description: "Residential accommodation for male students",
    category: "residential",
    coordinates: { x: 85, y: 70 },
  },
  {
    id: "7",
    name: "Medicinal Garden",
    code: "07",
    description: "Botanical garden and medicinal plants",
    category: "facility",
    coordinates: { x: 15, y: 70 },
  },
  {
    id: "8",
    name: "Cafeteria",
    code: "CF",
    description: "Food court and dining area",
    category: "facility",
    coordinates: { x: 70, y: 80 },
  },
  {
    id: "9",
    name: "Sports Ground",
    code: "SG",
    description: "Outdoor sports facilities and playground",
    category: "facility",
    coordinates: { x: 75, y: 85 },
  },
];

export default function CampusMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Campus Map</h1>
        <p className="text-muted-foreground">
          Navigate through Government Polytechnic Srinagar Garhwal campus
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Campus Layout
          </CardTitle>
          <CardDescription>
            Interactive map of campus buildings and facilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <svg
              viewBox="0 0 600 300"
              className="w-full h-auto border rounded-lg bg-slate-50"
              style={{ maxHeight: "400px" }}
            >
              {/* Campus boundary */}
              <rect x="10" y="10" width="580" height="280" rx="8" fill="none" stroke="#16a34a" strokeWidth="2" />

              {/* Admin Block */}
              <rect x="20" y="20" width="180" height="120" rx="8" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="30" y="50" fontSize="14" fontWeight="bold" fill="#1f2937">Admin Block</text>
              <text x="30" y="70" fontSize="12" fill="#6b7280">Code: 88</text>
              <text x="30" y="85" fontSize="11" fill="#9ca3af">Administrative offices</text>
              <text x="30" y="100" fontSize="11" fill="#9ca3af">Principal's office</text>
              <text x="30" y="115" fontSize="11" fill="#9ca3af">Main reception</text>

              {/* Library */}
              <rect x="220" y="20" width="180" height="120" rx="8" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="230" y="50" fontSize="14" fontWeight="bold" fill="#1f2937">Library</text>
              <text x="230" y="70" fontSize="12" fill="#6b7280">Code: 38 & 32</text>
              <text x="230" y="85" fontSize="11" fill="#9ca3af">Study materials</text>
              <text x="230" y="100" fontSize="11" fill="#9ca3af">Books & references</text>
              <text x="230" y="115" fontSize="11" fill="#9ca3af">Reading rooms</text>

              {/* Labs */}
              <rect x="420" y="20" width="160" height="220" rx="8" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="430" y="50" fontSize="14" fontWeight="bold" fill="#1f2937">Labs</text>
              <text x="430" y="70" fontSize="12" fill="#6b7280">Code: 15</text>
              <text x="430" y="85" fontSize="11" fill="#9ca3af">Computer labs</text>
              <text x="430" y="100" fontSize="11" fill="#9ca3af">IT classrooms</text>
              <text x="430" y="115" fontSize="11" fill="#9ca3af">Workshops</text>
              <text x="430" y="130" fontSize="11" fill="#9ca3af">Electrical labs</text>
              <text x="430" y="145" fontSize="11" fill="#9ca3af">Mechanical labs</text>

              {/* Canteen */}
              <circle cx="110" cy="200" r="40" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="90" y="195" fontSize="12" fontWeight="bold" fill="#1f2937">Canteen</text>
              <text x="90" y="210" fontSize="10" fill="#6b7280">Code: CF</text>

              {/* Sports Ground */}
              <rect x="420" y="250" width="160" height="30" rx="4" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="430" y="268" fontSize="11" fontWeight="bold" fill="#1f2937">Sports Ground</text>
              <text x="430" y="280" fontSize="9" fill="#6b7280">SG</text>

              {/* Hostels */}
              <rect x="20" y="160" width="80" height="60" rx="4" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="30" y="175" fontSize="10" fontWeight="bold" fill="#1f2937">Girls Hostel</text>
              <text x="30" y="185" fontSize="9" fill="#6b7280">41</text>

              <rect x="120" y="160" width="80" height="60" rx="4" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="130" y="175" fontSize="10" fontWeight="bold" fill="#1f2937">Boys Hostel</text>
              <text x="130" y="185" fontSize="9" fill="#6b7280">NIT</text>

              {/* Auditorium */}
              <rect x="220" y="160" width="120" height="80" rx="4" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="230" y="175" fontSize="11" fontWeight="bold" fill="#1f2937">Auditorium</text>
              <text x="230" y="185" fontSize="9" fill="#6b7280">16</text>
              <text x="230" y="195" fontSize="9" fill="#9ca3af">Events & seminars</text>

              {/* Medicinal Garden */}
              <rect x="360" y="160" width="50" height="50" rx="4" fill="#ffffff" stroke="#e6edf3" strokeWidth="2" />
              <text x="365" y="175" fontSize="9" fontWeight="bold" fill="#1f2937">Medicinal</text>
              <text x="365" y="185" fontSize="9" fontWeight="bold" fill="#1f2937">Garden</text>
              <text x="365" y="195" fontSize="8" fill="#6b7280">07</text>
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
