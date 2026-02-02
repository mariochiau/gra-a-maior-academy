import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Play, Clock, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/dashboard/BottomNav";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  pdf_url: string | null;
  duration_minutes: number | null;
  course_id: string;
  courses?: {
    title: string;
  };
}

const DashboardCursos = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    // Load lessons from enrolled courses
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', session.user.id)
      .eq('status', 'active');

    if (enrollments && enrollments.length > 0) {
      const courseIds = enrollments.map(e => e.course_id);
      
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select(`
          *,
          courses (title)
        `)
        .in('course_id', courseIds)
        .order('order_index', { ascending: true });

      setLessons(lessonsData || []);
    }

    setIsLoading(false);
  };

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-pulse text-primary">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary pb-24 pt-20">
      <main className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Minhas Aulas</h1>
            <p className="text-muted-foreground">Acesse o conteúdo dos seus cursos</p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {lesson.video_url && extractYouTubeId(lesson.video_url) && (
                    <div className="md:w-64 aspect-video bg-muted flex-shrink-0">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(lesson.video_url)}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <CardContent className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-accent font-medium">
                          {lesson.courses?.title || "Curso"}
                        </span>
                        <h3 className="font-serif font-bold text-foreground mt-1">{lesson.title}</h3>
                        {lesson.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{lesson.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      {lesson.duration_minutes && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration_minutes} min
                        </span>
                      )}
                      {lesson.pdf_url && (
                        <a
                          href={lesson.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:underline flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          Material de Apoio
                        </a>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-serif font-bold text-foreground mb-2">Nenhuma aula disponível</h3>
                <p className="text-muted-foreground mb-4">
                  Você ainda não está matriculado em nenhum curso ou não há aulas cadastradas.
                </p>
                <Button onClick={() => navigate('/cursos')} className="btn-gold">
                  Ver Cursos Disponíveis
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardCursos;
