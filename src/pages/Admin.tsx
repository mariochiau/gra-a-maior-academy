import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Users, BookOpen, Clock, TrendingUp, Bell } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStatsCard from "@/components/admin/AdminStatsCard";

interface AdminStats {
  totalStudents: number;
  totalCourses: number;
  totalHours: number;
  activeEnrollments: number;
}

const Admin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalHours: 0,
    activeEnrollments: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roles?.role !== 'admin') {
        navigate('/dashboard');
        return;
      }

      // Load admin profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', session.user.id)
        .single();

      if (profile?.full_name) {
        setAdminName(profile.full_name);
      }

      // Load stats
      const { count: totalStudents } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      const { count: activeEnrollments } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Calculate total hours from lessons
      const { data: lessons } = await supabase
        .from('lessons')
        .select('duration_minutes');

      const totalMinutes = lessons?.reduce((acc, l) => acc + (l.duration_minutes || 0), 0) || 0;
      const totalHours = Math.round(totalMinutes / 60);

      setStats({
        totalStudents: totalStudents || 0,
        totalCourses: totalCourses || 0,
        totalHours,
        activeEnrollments: activeEnrollments || 0,
      });

      // Load recent enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          id,
          enrolled_at,
          profiles!enrollments_user_id_fkey (full_name),
          courses (title)
        `)
        .order('enrolled_at', { ascending: false })
        .limit(5);

      setRecentEnrollments(enrollments || []);
      setIsLoading(false);
    };

    checkAuthAndLoadData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <AdminSidebar />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="bg-card px-4 lg:px-8 py-4 flex items-center justify-between border-b border-border sticky top-0 z-30">
          <div className="lg:pl-0 pl-14">
            <h1 className="text-xl font-serif font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Bem-vindo, {adminName}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AdminStatsCard
              icon={Users}
              label="Total de Alunos"
              value={stats.totalStudents}
              change="+12% este mês"
              changeType="positive"
              color="blue"
            />
            <AdminStatsCard
              icon={BookOpen}
              label="Cursos Ativos"
              value={stats.totalCourses}
              color="green"
            />
            <AdminStatsCard
              icon={Clock}
              label="Horas de Conteúdo"
              value={`${stats.totalHours}h`}
              color="orange"
            />
            <AdminStatsCard
              icon={TrendingUp}
              label="Matrículas Ativas"
              value={stats.activeEnrollments}
              change="+8% esta semana"
              changeType="positive"
              color="purple"
            />
          </div>

          {/* Recent Enrollments */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-serif font-bold text-foreground">Matrículas Recentes</h2>
              <button className="text-sm text-accent hover:underline">Ver todas</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Aluno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentEnrollments.length > 0 ? (
                    recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-secondary/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                          {enrollment.profiles?.full_name || "Aluno"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {enrollment.courses?.title || "Curso"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {new Date(enrollment.enrolled_at).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                        Nenhuma matrícula recente
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
