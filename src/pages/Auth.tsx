import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        redirectBasedOnRole(session.user.id);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          redirectBasedOnRole(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const redirectBasedOnRole = async (userId: string) => {
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (roles?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Erro",
            description: "As senhas não coincidem.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth`,
            data: {
              full_name: formData.nome,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Conta criada!",
          description: "Verifique seu e-mail para confirmar o cadastro.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-navy-light to-primary flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border-2 border-accent/30 mb-4">
            <BookOpen className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-primary-foreground">
            Instituto Bíblico
          </h1>
          <p className="text-accent font-serif text-lg">Graça Maior</p>
        </div>

        {/* Form Card */}
        <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-serif font-bold text-primary text-center mb-6">
            {isSignUp ? "Criar Conta" : "Bem-vindo de volta!"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-foreground">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                    required
                    className="h-12 pl-10 rounded-xl border-border bg-secondary/50"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  required
                  className="h-12 pl-10 rounded-xl border-border bg-secondary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="h-12 pl-10 pr-10 rounded-xl border-border bg-secondary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="h-12 pl-10 rounded-xl border-border bg-secondary/50"
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-accent hover:underline"
                >
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl text-lg mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                "Carregando..."
              ) : (
                <>
                  {isSignUp ? "Cadastrar" : "Entrar"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              {isSignUp ? "Já tem uma conta?" : "Ainda não tem conta?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-accent font-semibold hover:underline"
              >
                {isSignUp ? "Entrar" : "Cadastrar"}
              </button>
            </p>
          </div>
        </div>

        {/* Help */}
        <p className="text-center text-sm text-primary-foreground/70 mt-6">
          Precisa de ajuda?{" "}
          <a
            href="https://wa.me/258879113748"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Fale conosco
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
