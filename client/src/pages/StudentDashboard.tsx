import { useEffect, useState } from "react";
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
  const [announcements, setAnnouncements] = useState([]);
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements?published=true');
        if (response.ok) {
          const data = await response.json();
          // Filter to show only announcements for students (targetAudience = "all" or "students")
          const studentAnnouncements = data.filter((announcement: any) =>
            announcement.targetAudience === "all" || announcement.targetAudience === "students"
          );
          const formattedAnnouncements = studentAnnouncements.map((announcement: any) => ({
            id: announcement.id,
            title: announcement.title,
            content: announcement.content,
            date: announcement.date,
            priority: announcement.priority.toLowerCase(),
          }));
          setAnnouncements(formattedAnnouncements);
        }
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };

    fetchAnnouncements();

    // Set current day
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  // Mock timetable data - organized by day
  const timetableData = {
    Monday: [
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:00-11:40', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '11:40-1:20', teacher: 'Mrs. Reena' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
    ],
    Tuesday: [
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '9:00-10:40', teacher: 'Mr. Bhupendra Rana' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:40-12:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mrs. Reena' },
    ],
    Wednesday: [
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '9:00-10:40', teacher: 'Mrs. Reena' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:40-12:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
    ],
    Thursday: [
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '9:00-10:40', teacher: 'Mr. Bhupendra Rana' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:40-12:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mrs. Reena' },
    ],
    Friday: [
      { code: 'CS302', title: 'E-COMM', room: 'IT Lab', time: '9:00-10:40', teacher: 'Mrs. Reena' },
      { code: 'EL301', title: 'Java', room: 'IT Lab', time: '10:40-12:20', teacher: 'Mr. Bhupendra Rana' },
      { code: 'CS301', title: 'MP', room: 'IT Lab', time: '1:40-3:20', teacher: 'Mr. Bhupendra Rana' },
    ],
    Saturday: [],
    Sunday: []
  };

  const todayClasses = timetableData[currentDay as keyof typeof timetableData] || [];

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
          <TimetableCard day={currentDay} classes={todayClasses} />
        </div>
        
        <div>
          <AnnouncementList announcements={announcements} />
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
