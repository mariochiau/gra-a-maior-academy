import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-8 animate-fade-in">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">Matrículas Abertas 2025</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            A Educação Que te Prepara para o{" "}
            <span className="text-accent">Tempo</span> e a{" "}
            <span className="text-accent">Eternidade</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Formação teológica de excelência com professores qualificados, 
            metodologia híbrida e certificação reconhecida.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link to="/auth">
              <Button size="lg" className="btn-gold text-lg px-8 py-6 h-auto group">
                Inscreva-se Agora
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/cursos">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 h-auto border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <BookOpen className="mr-2 w-5 h-5" />
                Ver Cursos
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-primary-foreground/10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { number: "500+", label: "Alunos Formados" },
              { number: "15+", label: "Anos de Experiência" },
              { number: "20+", label: "Professores" },
              { number: "100%", label: "Certificação" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-serif font-bold text-accent mb-2">
                  {stat.number}
                </p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
