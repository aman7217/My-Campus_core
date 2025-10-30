import { DashboardStatsCard } from "@/components/DashboardStatsCard";
import { Users, GraduationCap, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // todo: remove mock functionality
  const stats = {
    students: 156,
    faculty: 12,
    announcements: 5,
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Students</CardTitle>
            <Button variant="outline" size="sm" data-testid="button-manage-students">
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Aarav Sharma - Computer Engg</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Priya Verma - Electrical Engg</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Rahul Kumar - Mechanical Engg</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Faculty Members</CardTitle>
            <Button variant="outline" size="sm" data-testid="button-manage-faculty">
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Dr. Meena Gupta - CSE</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Mr. Bhupendra Rana - CSE</span>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                <span>Mrs. Reena - CSE</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
