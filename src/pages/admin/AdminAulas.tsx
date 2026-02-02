import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Video, Plus, Trash2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  pdf_url: string | null;
  duration_minutes: number | null;
  order_index: number | null;
  course_id: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
}

const AdminAulas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    course_id: "",
    duration_minutes: "",
  });

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (roles?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    await Promise.all([loadLessons(), loadCourses()]);
    setIsLoading(false);
  };

  const loadLessons = async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading lessons:', error);
    } else {
      setLessons(data || []);
    }
  };

  const loadCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('id, title')
      .eq('is_active', true);

    if (error) {
      console.error('Error loading courses:', error);
    } else {
      setCourses(data || []);
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let pdfUrl = null;

      // Upload PDF if provided
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('materials')
          .upload(fileName, pdfFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('materials')
          .getPublicUrl(fileName);
        
        pdfUrl = publicUrl;
      }

      // Insert lesson
      const { error } = await supabase.from('lessons').insert({
        title: formData.title,
        description: formData.description || null,
        video_url: formData.video_url || null,
        pdf_url: pdfUrl,
        course_id: formData.course_id,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : null,
        order_index: lessons.length,
      });

      if (error) throw error;

      toast({
        title: "Aula cadastrada!",
        description: `${formData.title} foi adicionada com sucesso.`,
      });

      setFormData({ title: "", description: "", video_url: "", course_id: "", duration_minutes: "" });
      setPdfFile(null);
      setShowForm(false);
      loadLessons();
    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta aula?")) return;

    const { error } = await supabase.from('lessons').delete().eq('id', id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Aula excluída!" });
      loadLessons();
    }
  };

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

      <div className="lg:ml-64 min-h-screen pt-20">
        <main className="p-4 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Gestão de Aulas</h1>
                <p className="text-muted-foreground">Adicione vídeos do YouTube e materiais de apoio</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Nova Aula
            </Button>
          </div>

          {/* Add Lesson Form */}
          {showForm && (
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Cadastrar Nova Aula</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título da Aula *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Introdução ao Antigo Testamento"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="course">Curso *</Label>
                      <Select
                        value={formData.course_id}
                        onValueChange={(value) => setFormData({ ...formData, course_id: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_url">Link do YouTube</Label>
                    <Input
                      id="video_url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    {formData.video_url && extractYouTubeId(formData.video_url) && (
                      <div className="mt-2 rounded-lg overflow-hidden aspect-video max-w-md">
                        <iframe
                          src={`https://www.youtube.com/embed/${extractYouTubeId(formData.video_url)}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição / Legenda</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva o conteúdo desta aula..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração (minutos)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={formData.duration_minutes}
                        onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                        placeholder="Ex: 45"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pdf">Material de Apoio (PDF)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="pdf"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                          className="cursor-pointer"
                        />
                        {pdfFile && (
                          <span className="text-sm text-accent flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {pdfFile.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="btn-gold">
                      {isSubmitting ? "Salvando..." : "Salvar Aula"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.length > 0 ? (
              lessons.map((lesson) => (
                <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {lesson.video_url && extractYouTubeId(lesson.video_url) && (
                    <div className="aspect-video bg-muted">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(lesson.video_url)}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-serif font-bold text-foreground mb-2">{lesson.title}</h3>
                    {lesson.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{lesson.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lesson.duration_minutes && (
                          <span className="text-xs text-muted-foreground">
                            {lesson.duration_minutes} min
                          </span>
                        )}
                        {lesson.pdf_url && (
                          <a
                            href={lesson.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline text-xs flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" />
                            PDF
                          </a>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(lesson.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma aula cadastrada ainda.</p>
                  <Button onClick={() => setShowForm(true)} className="mt-4 btn-gold">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar primeira aula
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAulas;
