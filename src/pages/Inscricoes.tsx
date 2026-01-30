import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Inscricoes = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    curso: "",
    mensagem: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, curso: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inscrição Enviada!",
      description: "Entraremos em contacto em breve. Obrigado pelo interesse!",
    });

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      curso: "",
      mensagem: "",
    });
    setIsSubmitting(false);
  };

  const whatsappNumber = "258879113748";
  const whatsappMessage = encodeURIComponent(
    `Olá! Meu nome é ${formData.nome || "[Seu Nome]"}. Gostaria de me inscrever no ${formData.curso || "curso de Teologia"} do Instituto Bíblico Graça Maior.`
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Inscrições
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6">
                Comece Sua{" "}
                <span className="text-accent">Jornada</span> Hoje
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Preencha o formulário abaixo ou entre em contacto via WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Form */}
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card">
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                  Formulário de Inscrição
                </h2>
                <p className="text-muted-foreground mb-8">
                  Preencha seus dados e entraremos em contacto.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone *</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        placeholder="+258 8X XXX XXXX"
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="curso">Curso de Interesse *</Label>
                    <Select value={formData.curso} onValueChange={handleSelectChange} required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trimestral">Curso Trimestral - 1.100,00 MT</SelectItem>
                        <SelectItem value="semestral">Curso Semestral - 1.600,00 MT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem (Opcional)</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      placeholder="Conte-nos mais sobre você e seus objetivos..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-gold py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar Inscrição
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* WhatsApp Option */}
              <div className="lg:pl-8">
                <div className="sticky top-28">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-2">
                    Prefere WhatsApp?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fale diretamente conosco para tirar dúvidas ou 
                    fazer sua inscrição de forma rápida.
                  </p>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg">
                      <MessageCircle className="mr-2 w-5 h-5" />
                      Falar no WhatsApp
                    </Button>
                  </a>

                  <div className="mt-12 space-y-6">
                    <h3 className="font-semibold text-primary">O que acontece após a inscrição?</h3>
                    <ul className="space-y-4">
                      {[
                        "Nossa equipe entrará em contacto em até 24 horas",
                        "Você receberá informações sobre datas e horários",
                        "Orientações sobre formas de pagamento",
                        "Acesso ao material de boas-vindas",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-accent" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 p-6 bg-accent/10 rounded-xl">
                    <h3 className="font-semibold text-primary mb-2">Dúvidas?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Entre em contacto pelos nossos canais:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="text-muted-foreground">Tel:</span>{" "}
                        <a href="tel:+258879113748" className="text-accent hover:underline">
                          +258 879 113 748
                        </a>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        <a href="mailto:nimo.ggmoz@gmail.com" className="text-accent hover:underline">
                          nimo.ggmoz@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Inscricoes;
