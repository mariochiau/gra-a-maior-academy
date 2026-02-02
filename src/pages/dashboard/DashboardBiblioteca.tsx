import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Download, FileText, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BottomNav from "@/components/dashboard/BottomNav";

interface LibraryItem {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: string | null;
  created_at: string;
}

const DashboardBiblioteca = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<LibraryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, [searchQuery, items]);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data } = await supabase
      .from('library')
      .select('*')
      .order('created_at', { ascending: false });

    setItems(data || []);
    setFilteredItems(data || []);
    setIsLoading(false);
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
            <h1 className="text-2xl font-serif font-bold text-foreground">Biblioteca</h1>
            <p className="text-muted-foreground">Livros e materiais de estudo</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título..."
            className="pl-10"
          />
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground text-sm mb-1 line-clamp-2">{item.title}</h3>
                  <span className="text-xs text-muted-foreground uppercase">
                    {item.file_type || 'PDF'}
                  </span>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Baixar
                  </a>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="col-span-2">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? "Nenhum documento encontrado." : "Nenhum documento disponível na biblioteca ainda."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardBiblioteca;
