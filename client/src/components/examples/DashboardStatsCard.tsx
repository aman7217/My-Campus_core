import { DashboardStatsCard } from '../DashboardStatsCard';
import { Calendar, BookOpen, Users } from 'lucide-react';

export default function DashboardStatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <DashboardStatsCard
        title="Today's Classes"
        value="4 classes"
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
        title="Total Students"
        value="156"
        subtitle="Computer Engineering"
        icon={Users}
        iconColor="text-purple-600"
      />
    </div>
  );
}
