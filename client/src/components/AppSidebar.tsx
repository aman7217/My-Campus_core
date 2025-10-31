import { Home, Calendar, BookOpen, MapPin, MessageCircle, Settings, Users, Bell, FileText, FileCheck } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  role?: "student" | "admin" | "teacher";
}

export function AppSidebar({ role = "student" }: AppSidebarProps) {
  const [location] = useLocation();

  const studentItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Timetable", url: "/timetable", icon: Calendar },
    { title: "Study Materials", url: "/materials", icon: BookOpen },
    { title: "Student Notes", url: "/notes", icon: FileText },
    { title: "Sample Papers", url: "/sample-papers", icon: FileCheck },
    { title: "Reservations", url: "/reservations", icon: Settings },
    { title: "Campus Map", url: "/map", icon: MapPin },
    { title: "Chatbot", url: "/chat", icon: MessageCircle },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Faculty", url: "/admin/faculty", icon: Users },
    { title: "Announcements", url: "/admin/announcements", icon: Bell },
    { title: "Teacher Announcements", url: "/admin/teacher-announcements", icon: Bell },
    { title: "Campus Map", url: "/admin/map", icon: MapPin },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const teacherItems = [
    { title: "Dashboard", url: "/teacher", icon: Home },
    { title: "Students", url: "/teacher/students", icon: Users },
    { title: "Announcements", url: "/teacher/announcements", icon: Bell },
    { title: "Assignments", url: "/teacher/assignments", icon: FileCheck },
    { title: "Sample Papers", url: "/teacher/sample-papers", icon: FileCheck },
    { title: "Student Notes", url: "/teacher/notes", icon: FileText },
    { title: "Reservations", url: "/teacher/reservations", icon: Settings },
    { title: "Chatbot", url: "/teacher/chat", icon: MessageCircle },
    { title: "Campus Map", url: "/teacher/map", icon: MapPin },
  ];

  const items = role === "admin" ? adminItems : role === "teacher" ? teacherItems : studentItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">
            {role === "admin" ? "Admin Panel" : role === "teacher" ? "Teacher Panel" : "Smart Campus"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
