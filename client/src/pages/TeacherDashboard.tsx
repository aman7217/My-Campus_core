import { useEffect, useState } from "react";
import { DashboardStatsCard } from "@/components/DashboardStatsCard";
import { Users, GraduationCap, Bell, FileCheck, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function TeacherDashboard() {
  const [, setLocation] = useLocation();
  const [stats, setStats] = useState({
    students: 0,
    announcements: 0,
    assignments: 0,
    notes: 0,
    reservations: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch students count
        const studentsResponse = await fetch('/api/students');
        const studentsData = studentsResponse.ok ? await studentsResponse.json() : [];
        const studentsCount = studentsData.length;

        // Fetch announcements count (only teacher announcements)
        const announcementsResponse = await fetch('/api/announcements');
        const announcementsData = announcementsResponse.ok ? await announcementsResponse.json() : [];
        const teacherAnnouncements = announcementsData.filter((ann: any) => ann.author === "Teacher");
        const announcementsCount = teacherAnnouncements.length;

        // Fetch assignments count (placeholder - will be implemented)
        const assignmentsCount = 0; // TODO: Implement assignments API

        // Fetch notes count
        const notesResponse = await fetch('/api/notes');
        const notesData = notesResponse.ok ? await notesResponse.json() : [];
        const notesCount = notesData.length;

        // Fetch pending reservations count
        const reservationsResponse = await fetch('/api/reservations');
        const reservationsData = reservationsResponse.ok ? await reservationsResponse.json() : [];
        const pendingReservationsCount = reservationsData.filter((res: any) => res.status === 'pending').length;

        setStats({
          students: studentsCount,
          announcements: announcementsCount,
          assignments: assignmentsCount,
          notes: notesCount,
          reservations: pendingReservationsCount,
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
        <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage students, announcements, assignments, and monitor student activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <DashboardStatsCard
          title="Total Students"
          value={stats.students}
          subtitle="All branches"
          icon={GraduationCap}
          iconColor="text-blue-600"
        />
        <DashboardStatsCard
          title="Announcements"
          value={stats.announcements}
          subtitle="Published notices"
          icon={Bell}
          iconColor="text-orange-600"
        />
        <DashboardStatsCard
          title="Assignments"
          value={stats.assignments}
          subtitle="Active assignments"
          icon={FileCheck}
          iconColor="text-green-600"
        />
        <DashboardStatsCard
          title="Student Notes"
          value={stats.notes}
          subtitle="Uploaded notes"
          icon={Users}
          iconColor="text-purple-600"
        />
        <DashboardStatsCard
          title="Pending Reservations"
          value={stats.reservations}
          subtitle="Awaiting approval"
          icon={Settings}
          iconColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Student Management</CardTitle>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-manage-students"
              onClick={() => setLocation("/teacher/students")}
            >
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {stats.students > 0 ? (
                <div className="text-muted-foreground">
                  {stats.students} students enrolled across all branches
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No students enrolled yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Announcements</CardTitle>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-create-announcement"
              onClick={() => setLocation("/teacher/announcements")}
            >
              Create
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {stats.announcements > 0 ? (
                <div className="text-muted-foreground">
                  {stats.announcements} announcements published
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No announcements yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reservations</CardTitle>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-manage-reservations"
              onClick={() => setLocation("/teacher/reservations")}
            >
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {stats.reservations > 0 ? (
                <div className="text-muted-foreground">
                  {stats.reservations} pending reservations
                </div>
              ) : (
                <div className="text-muted-foreground">
                  No pending reservations
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
