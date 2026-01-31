import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Alunos", path: "/admin/alunos" },
  { icon: BookOpen, label: "Cursos", path: "/admin/cursos" },
  { icon: GraduationCap, label: "Aulas", path: "/admin/aulas" },
  { icon: FileText, label: "Matrículas", path: "/admin/matriculas" },
  { icon: Settings, label: "Configurações", path: "/admin/configuracoes" },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar = ({ collapsed = false, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-serif font-bold text-primary-foreground text-sm">
                Instituto Bíblico
              </h1>
              <p className="text-accent text-xs">Graça Maior</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-primary-foreground/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Sair</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed left-0 top-0 h-full w-64 bg-primary z-40 transform transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block fixed left-0 top-0 h-full bg-primary transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default AdminSidebar;
