import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // For now, show a message that auth needs to be configured
    toast({
      title: "Sistema em Configuração",
      description: "O sistema de login será ativado em breve. Por favor, entre em contacto via WhatsApp.",
      variant: "destructive",
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Logo */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-3 group">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-105">
                    <BookOpen className="w-8 h-8 text-accent" />
                  </div>
                </Link>
                <h1 className="text-2xl font-serif font-bold text-primary mt-4">
                  {isSignUp ? "Criar Conta" : "Entrar na Plataforma"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isSignUp
                    ? "Preencha os dados para criar sua conta"
                    : "Acesse sua área de estudos"}
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Seu nome completo"
                        required
                        className="h-12"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
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
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        required
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          required
                          className="h-12 pl-10"
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
                    className="w-full btn-gold py-6 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Carregando..."
                    ) : (
                      <>
                        {isSignUp ? "Criar Conta" : "Entrar"}
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
                      {isSignUp ? "Entrar" : "Criar conta"}
                    </button>
                  </p>
                </div>
              </div>

              {/* Help */}
              <p className="text-center text-sm text-muted-foreground mt-6">
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
