import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const whatsappNumber = "258879113748";
  const whatsappMessage = encodeURIComponent(
    "Olá! Gostaria de obter mais informações sobre o curso de Teologia do Instituto Bíblico Graça Maior."
  );

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a365d' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
            Pronto para Iniciar sua{" "}
            <span className="text-accent">Jornada Teológica</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Junte-se a centenas de estudantes que já estão transformando suas vidas 
            através do conhecimento bíblico.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/inscricoes">
              <Button size="lg" className="btn-gold text-lg px-8 py-6 h-auto group">
                Fazer Inscrição
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 h-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Falar no WhatsApp
              </Button>
            </a>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Dúvidas? Entre em contacto:{" "}
              <a href="tel:+258879113748" className="text-accent hover:underline">
                +258 879 113 748
              </a>{" "}
              ou{" "}
              <a href="mailto:nimo.ggmoz@gmail.com" className="text-accent hover:underline">
                nimo.ggmoz@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
