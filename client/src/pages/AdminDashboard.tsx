import { useEffect, useState } from "react";
import { DashboardStatsCard } from "@/components/DashboardStatsCard";
import { Users, GraduationCap, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    announcements: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch students count
        const studentsResponse = await fetch('/api/students');
        const studentsData = studentsResponse.ok ? await studentsResponse.json() : [];
        const studentsCount = studentsData.length;

        // Fetch faculty count
        const facultyResponse = await fetch('/api/faculty');
        const facultyData = facultyResponse.ok ? await facultyResponse.json() : [];
        const facultyCount = facultyData.length;

        // Fetch announcements count
        const announcementsResponse = await fetch('/api/announcements');
        const announcementsData = announcementsResponse.ok ? await announcementsResponse.json() : [];
        const announcementsCount = announcementsData.length;

        setStats({
          students: studentsCount,
          faculty: facultyCount,
          announcements: announcementsCount,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage students, faculty, and announcements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardStatsCard
          title="Total Students"
          value={stats.students}
          subtitle="Computer Engineering"
          icon={GraduationCap}
          iconColor="text-blue-600"
        />
        <DashboardStatsCard
          title="Total Faculty"
          value={stats.faculty}
          subtitle="All departments"
          icon={Users}
          iconColor="text-green-600"
        />
        <DashboardStatsCard
          title="Announcements"
          value={stats.announcements}
          subtitle="Active notices"
          icon={Bell}
          iconColor="text-orange-600"
        />

      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-manage-students"
              onClick={() => setLocation("/admin/students")}
            >
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {stats.students > 0 ? (
                <div className="text-muted-foreground">
                  {stats.students} students enrolled
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No students enrolled yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>


      </div>
    </div>
  );
}
