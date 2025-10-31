import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import StudentDashboard from "@/pages/StudentDashboard";
import TimetablePage from "@/pages/TimetablePage";
import StudyMaterialsPage from "@/pages/StudyMaterialsPage";
import ReservationsPage from "@/pages/ReservationsPage";
import CampusMapPage from "@/pages/CampusMapPage";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminStudentsPage from "@/pages/AdminStudentsPage";
import AdminFacultyPage from "@/pages/AdminFacultyPage";
import AdminAnnouncementsPage from "@/pages/AdminAnnouncementsPage";
import AdminSettingsPage from "@/pages/AdminSettingsPage";

import ChatbotPage from "@/pages/ChatbotPage";
import StudentNotesPage from "@/pages/StudentNotesPage";
import AdminSamplePapersPage from "@/pages/AdminSamplePapersPage";
import StudentSamplePapersPage from "@/pages/StudentSamplePapersPage";
import TeacherDashboard from "@/pages/TeacherDashboard";
import TeacherStudentsPage from "@/pages/TeacherStudentsPage";
import TeacherAnnouncementsPage from "@/pages/TeacherAnnouncementsPage";
import TeacherAssignmentsPage from "@/pages/TeacherAssignmentsPage";
import TeacherNotesPage from "@/pages/TeacherNotesPage";
import TeacherReservationsPage from "@/pages/TeacherReservationsPage";
import AdminTeacherAnnouncementsPage from "@/pages/AdminTeacherAnnouncementsPage";

function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userType = localStorage.getItem("userType");

    if (!isLoggedIn) {
      setLocation("/login");
    } else if (userType === "admin") {
      setLocation("/admin");
    } else if (userType === "teacher") {
      setLocation("/teacher");
    } else if (userType === "student") {
      // Render StudentDashboard inline
      return;
    }
  }, [setLocation]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  if (!isLoggedIn) {
    return null; // Will redirect
  }

  if (userType === "student") {
    return (
      <AppLayout role="student">
        <StudentDashboard />
      </AppLayout>
    );
  }

  if (userType === "teacher") {
    return (
      <AppLayout role="teacher">
        <TeacherDashboard />
      </AppLayout>
    );
  }

  return null; // Should not reach here, but fallback
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {/* Student Routes */}
      <Route path="/" component={Home} />
      <Route path="/timetable">
        <AppLayout role="student">
          <TimetablePage />
        </AppLayout>
      </Route>
      <Route path="/materials">
        <AppLayout role="student">
          <StudyMaterialsPage />
        </AppLayout>
      </Route>
      <Route path="/reservations">
        <AppLayout role="student">
          <ReservationsPage />
        </AppLayout>
      </Route>
      <Route path="/map">
        <AppLayout role="student">
          <CampusMapPage />
        </AppLayout>
      </Route>
      <Route path="/chat">
        <AppLayout role="student">
          <ChatbotPage />
        </AppLayout>
      </Route>
      <Route path="/notes">
        <AppLayout role="student">
          <StudentNotesPage />
        </AppLayout>
      </Route>
      <Route path="/sample-papers">
        <AppLayout role="student">
          <StudentSamplePapersPage />
        </AppLayout>
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher">
        <AppLayout role="teacher">
          <TeacherDashboard />
        </AppLayout>
      </Route>
      <Route path="/teacher/students">
        <AppLayout role="teacher">
          <TeacherStudentsPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/announcements">
        <AppLayout role="teacher">
          <TeacherAnnouncementsPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/assignments">
        <AppLayout role="teacher">
          <TeacherAssignmentsPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/sample-papers">
        <AppLayout role="teacher">
          <AdminSamplePapersPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/notes">
        <AppLayout role="teacher">
          <TeacherNotesPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/reservations">
        <AppLayout role="teacher">
          <TeacherReservationsPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/chat">
        <AppLayout role="teacher">
          <ChatbotPage />
        </AppLayout>
      </Route>
      <Route path="/teacher/map">
        <AppLayout role="teacher">
          <CampusMapPage />
        </AppLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin">
        <AppLayout role="admin">
          <AdminDashboard />
        </AppLayout>
      </Route>
      <Route path="/admin/students">
        <AppLayout role="admin">
          <AdminStudentsPage />
        </AppLayout>
      </Route>
      <Route path="/admin/faculty">
        <AppLayout role="admin">
          <AdminFacultyPage />
        </AppLayout>
      </Route>
      <Route path="/admin/announcements">
        <AppLayout role="admin">
          <AdminAnnouncementsPage />
        </AppLayout>
      </Route>
      <Route path="/admin/settings">
        <AppLayout role="admin">
          <AdminSettingsPage />
        </AppLayout>
      </Route>

      <Route path="/admin/teacher-announcements">
        <AppLayout role="admin">
          <AdminTeacherAnnouncementsPage />
        </AppLayout>
      </Route>
      <Route path="/admin/map">
        <AppLayout role="admin">
          <CampusMapPage />
        </AppLayout>
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


