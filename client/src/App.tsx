import { Switch, Route, Redirect } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      
      {/* Student Routes */}
      <Route path="/">
        <AppLayout role="student">
          <StudentDashboard />
        </AppLayout>
      </Route>
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

      {/* Admin Routes */}
      <Route path="/admin">
        <AppLayout role="admin">
          <AdminDashboard />
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
