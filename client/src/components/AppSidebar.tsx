import { Home, Calendar, BookOpen, MapPin, MessageCircle, Settings, Users, Bell } from "lucide-react";
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
  role?: "student" | "admin";
}

export function AppSidebar({ role = "student" }: AppSidebarProps) {
  const [location] = useLocation();

  const studentItems = [
    { title: "Dashboard", url: "/", icon: Home },
    { title: "Timetable", url: "/timetable", icon: Calendar },
    { title: "Study Materials", url: "/materials", icon: BookOpen },
    { title: "Reservations", url: "/reservations", icon: Settings },
    { title: "Campus Map", url: "/map", icon: MapPin },
    { title: "Chatbot", url: "/chat", icon: MessageCircle },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: Home },
    { title: "Students", url: "/admin/students", icon: Users },
    { title: "Faculty", url: "/admin/faculty", icon: Users },
    { title: "Announcements", url: "/admin/announcements", icon: Bell },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const items = role === "admin" ? adminItems : studentItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">
            {role === "admin" ? "Admin Panel" : "Smart Campus"}
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
