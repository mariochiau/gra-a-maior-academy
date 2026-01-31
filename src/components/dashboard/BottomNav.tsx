import { Home, BookOpen, BarChart3, CreditCard, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Início", path: "/dashboard" },
  { icon: BookOpen, label: "Cursos", path: "/dashboard/cursos" },
  { icon: BarChart3, label: "Progresso", path: "/dashboard/progresso" },
  { icon: CreditCard, label: "Planos", path: "/dashboard/planos" },
  { icon: User, label: "Perfil", path: "/dashboard/perfil" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors min-w-[60px]",
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "text-accent")} />
              <span className={cn(
                "text-xs font-medium",
                isActive && "text-accent"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
