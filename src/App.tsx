import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Cursos from "./pages/Cursos";
import FAQ from "./pages/FAQ";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminAlunos from "./pages/admin/AdminAlunos";
import AdminAulas from "./pages/admin/AdminAulas";
import AdminBiblioteca from "./pages/admin/AdminBiblioteca";

// Dashboard pages
import DashboardCursos from "./pages/dashboard/DashboardCursos";
import DashboardBiblioteca from "./pages/dashboard/DashboardBiblioteca";
import DashboardPerfil from "./pages/dashboard/DashboardPerfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/cursos" element={<DashboardCursos />} />
          <Route path="/dashboard/biblioteca" element={<DashboardBiblioteca />} />
          <Route path="/dashboard/perfil" element={<DashboardPerfil />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/alunos" element={<AdminAlunos />} />
          <Route path="/admin/aulas" element={<AdminAulas />} />
          <Route path="/admin/biblioteca" element={<AdminBiblioteca />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
