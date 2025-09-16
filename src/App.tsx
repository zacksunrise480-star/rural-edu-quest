import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentPortal from "./pages/StudentPortal";
import StudentName from "./pages/StudentName";
import StudentSubjects from "./pages/StudentSubjects";
import StudentChapters from "./pages/StudentChapters";
import StudentGame from "./pages/StudentGame";
import TeacherPortal from "./pages/TeacherPortal";
import TeacherName from "./pages/TeacherName";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/student/name" element={<StudentName />} />
          <Route path="/student/subjects" element={<StudentSubjects />} />
          <Route path="/student/chapters/:subject" element={<StudentChapters />} />
          <Route path="/student/game/:subject/:chapter/:gameType" element={<StudentGame />} />
          <Route path="/teacher" element={<TeacherPortal />} />
          <Route path="/teacher/name" element={<TeacherName />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
