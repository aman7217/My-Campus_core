import { CampusMap } from "@/components/CampusMap";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function CampusMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Campus Map</h1>
        <p className="text-muted-foreground">
          Interactive map of Government Polytechnic Srinagar Garhwal campus
        </p>
      </div>

      <CampusMap />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Quick Directions</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• IT Lab: Labs Block, 3rd Floor</li>
            <li>• Library: Main Building, Ground Floor</li>
            <li>• Admin Office: Admin Block, 1st Floor</li>
            <li>• Canteen: Near Sports Ground</li>
          </ul>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Campus Facilities</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Computer Labs (5)</li>
            <li>• Smart Classrooms (3)</li>
            <li>• Library & Reading Room</li>
            <li>• Sports Ground & Gym</li>
          </ul>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
