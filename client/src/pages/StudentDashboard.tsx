import { HeroSection } from "@/components/HeroSection";
import { DashboardStatsCard } from "@/components/DashboardStatsCard";
import { TimetableCard } from "@/components/TimetableCard";
import { AnnouncementList } from "@/components/AnnouncementList";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Calendar, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function StudentDashboard() {
  const [, setLocation] = useLocation();

  // todo: remove mock functionality
  const todayClasses = [
    { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mr. Bhupendra Rana' },
    { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
    { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
  ];

  const announcements = [
    {
      id: '1',
      title: 'Zonal Games Starting Next Week',
      content: 'All students are invited to participate in the annual zonal games.',
      date: 'Oct 25, 2025',
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'New Study Materials Available',
      content: 'Updated course materials for Microprocessors and Java Programming.',
      date: 'Oct 23, 2025',
      priority: 'medium' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <HeroSection />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStatsCard
          title="Today's Classes"
          value={`${todayClasses.length} classes`}
          subtitle="Next class at 10:00 AM"
          icon={Calendar}
          iconColor="text-blue-600"
        />
        <DashboardStatsCard
          title="Study Materials"
          value="23 resources"
          subtitle="5 new this week"
          icon={BookOpen}
          iconColor="text-green-600"
        />
        <DashboardStatsCard
          title="Upcoming"
          value="Lab booking"
          subtitle="Tomorrow at 2:00 PM"
          icon={Clock}
          iconColor="text-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation('/timetable')}
              data-testid="button-view-full-timetable"
            >
              View Full Timetable
            </Button>
          </div>
          <TimetableCard day="Monday" classes={todayClasses} />
        </div>
        
        <div>
          <AnnouncementList announcements={announcements} />
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
