import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Bell } from "lucide-react";
import BottomNav from "@/components/dashboard/BottomNav";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import CourseCard from "@/components/dashboard/CourseCard";

interface Profile {
  full_name: string | null;
  avatar_url: string | null;
}

interface CourseWithProgress {
  id: string;
  title: string;
  instructor: string | null;
  thumbnail_url: string | null;
  totalLessons: number;
  completedLessons: number;
  progress: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    streak: 0,
    hoursWatched: 0,
    certificates: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Check if user is admin - redirect to admin panel
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roles?.role === 'admin') {
        navigate('/admin');
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('user_id', session.user.id)
        .single();

      setProfile(profileData);

      // Load enrolled courses with progress
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          course_id,
          courses (
            id,
            title,
            instructor,
            thumbnail_url
          )
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'active');

      if (enrollments) {
        const coursesWithProgress: CourseWithProgress[] = [];
        
        for (const enrollment of enrollments) {
          if (enrollment.courses) {
            const course = enrollment.courses as any;
            
            // Get lesson count
            const { count: totalLessons } = await supabase
              .from('lessons')
              .select('*', { count: 'exact', head: true })
              .eq('course_id', course.id);

            // Get completed lessons
            const { count: completedLessons } = await supabase
              .from('lesson_progress')
              .select('*', { count: 'exact', head: true })
              .eq('user_id', session.user.id)
              .eq('completed', true);

            const total = totalLessons || 0;
            const completed = completedLessons || 0;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            coursesWithProgress.push({
              id: course.id,
              title: course.title,
              instructor: course.instructor,
              thumbnail_url: course.thumbnail_url,
              totalLessons: total,
              completedLessons: completed,
              progress,
            });
          }
        }
        
        setCourses(coursesWithProgress);
      }

      // Load stats
      const { count: lessonsCompleted } = await supabase
        .from('lesson_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
        .eq('completed', true);

      setStats({
        lessonsCompleted: lessonsCompleted || 0,
        streak: 7, // Mock for now
        hoursWatched: 12, // Mock for now
        certificates: 0,
      });

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
    <div className="min-h-screen bg-secondary pb-24">
      {/* Header */}
      <header className="bg-card px-4 py-4 flex items-center justify-between border-b border-border sticky top-0 z-40">
        <div>
          <h1 className="text-lg font-serif font-bold text-primary">Instituto Bíblico</h1>
          <p className="text-xs text-muted-foreground">Graça Maior</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Welcome Banner */}
        <WelcomeBanner userName={profile?.full_name || "Aluno"} />

        {/* Stats Cards */}
        <StatsCards
          lessonsCompleted={stats.lessonsCompleted}
          streak={stats.streak}
          hoursWatched={stats.hoursWatched}
          certificates={stats.certificates}
        />

        {/* Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif font-bold text-foreground">Seus Cursos</h2>
            <button className="text-sm text-accent hover:underline">Ver todos</button>
          </div>

          {courses.length > 0 ? (
            <div className="space-y-4">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  instructor={course.instructor || "Instituto Bíblico"}
                  progress={course.progress}
                  totalLessons={course.totalLessons}
                  completedLessons={course.completedLessons}
                  thumbnail={course.thumbnail_url || undefined}
                  onContinue={() => navigate(`/dashboard/curso/${course.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl p-8 text-center border border-border">
              <p className="text-muted-foreground">Você ainda não está matriculado em nenhum curso.</p>
              <button className="mt-4 text-accent hover:underline font-medium">
                Explorar cursos
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Dashboard;
