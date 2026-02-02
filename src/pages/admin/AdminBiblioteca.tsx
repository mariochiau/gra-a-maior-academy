import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus, Trash2, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface LibraryItem {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string | null;
  created_at: string;
}

const AdminBiblioteca = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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

    loadItems();
  };

  const loadItems = async () => {
    const { data, error } = await supabase
      .from('library')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading library:', error);
    } else {
      setItems(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "Arquivo obrigatório",
        description: "Por favor, selecione um arquivo para upload.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload file
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('library')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('library')
        .getPublicUrl(fileName);

      // Insert library item
      const { error } = await supabase.from('library').insert({
        title: formData.title,
        description: formData.description || null,
        file_url: publicUrl,
        file_type: fileExt,
      });

      if (error) throw error;

      toast({
        title: "Documento adicionado!",
        description: `${formData.title} foi adicionado à biblioteca.`,
      });

      setFormData({ title: "", description: "" });
      setFile(null);
      setShowForm(false);
      loadItems();
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este documento?")) return;

    const { error } = await supabase.from('library').delete().eq('id', id);

    if (error) {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Documento excluído!" });
      loadItems();
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
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-foreground">Biblioteca</h1>
                <p className="text-muted-foreground">Faça upload de livros e documentos para os alunos</p>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Novo Documento
            </Button>
          </div>

          {/* Add Document Form */}
          {showForm && (
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Adicionar Documento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: Introdução à Teologia Sistemática"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="file">Arquivo (PDF, DOCX, etc.) *</Label>
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx,.epub"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Breve descrição do conteúdo..."
                      rows={3}
                    />
                  </div>

                  {file && (
                    <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                      <FileText className="w-5 h-5 text-accent" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSubmitting} className="btn-gold">
                      {isSubmitting ? "Enviando..." : "Adicionar à Biblioteca"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Library Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.length > 0 ? (
              items.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                      <FileText className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-2 line-clamp-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground uppercase">
                        {item.file_type || 'PDF'}
                      </span>
                      <div className="flex gap-1">
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive hover:text-destructive p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhum documento na biblioteca ainda.</p>
                  <Button onClick={() => setShowForm(true)} className="mt-4 btn-gold">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar primeiro documento
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

export default AdminBiblioteca;
