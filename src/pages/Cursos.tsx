import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Users, Award, Check, ArrowRight } from "lucide-react";

const course = {
  id: "formacao-completa",
  title: "Formação Teológica Completa",
  subtitle: "Renovação Trimestral",
  price: "1.600,00",
  currency: "MT",
  duration: "Renovação a cada 3 meses",
  features: [
    "Acesso a todos os módulos",
    "Material didático premium",
    "Aulas presenciais e online",
    "Certificado de conclusão",
    "Acesso ilimitado à biblioteca",
    "Mentoria individual",
    "Participação em eventos",
    "Acompanhamento pastoral",
  ],
};

const subjects = [
  "Introdução à Bíblia",
  "Teologia Sistemática",
  "Hermenêutica Bíblica",
  "História da Igreja",
  "Homilética",
  "Aconselhamento Pastoral",
  "Liderança Cristã",
  "Missões e Evangelismo",
  "Ética Cristã",
  "Antigo Testamento",
  "Novo Testamento",
  "Apologética",
];

const Cursos = () => {
  return (
    <div className="min-h-screen pt-20">
      <main>
        {/* Hero */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Nossos Cursos
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6">
                Escolha Seu{" "}
                <span className="text-accent">Plano de Estudos</span>
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Oferecemos opções flexíveis para se adequar à sua disponibilidade 
                e objetivos ministeriais.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <div className="relative rounded-2xl p-8 bg-primary text-primary-foreground shadow-card">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-primary text-sm font-semibold px-4 py-1 rounded-full">
                    Plano Único
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold mb-2 text-primary-foreground">
                    {course.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {course.subtitle}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-accent">
                      {course.price}
                    </span>
                    <span className="text-primary-foreground/70">
                      {course.currency}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-primary-foreground/70">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-accent">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-primary-foreground/90">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to="/auth">
                  <Button className="w-full py-6 text-lg btn-gold">
                    Inscrever-se
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Grade Curricular
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-4 mb-6">
                O Que Você Vai Aprender
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa grade curricular foi cuidadosamente elaborada para proporcionar 
                uma formação teológica completa e aplicável ao ministério.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {subjects.map((subject, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-secondary rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <BookOpen className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Horários Flexíveis</h3>
                <p className="text-muted-foreground text-sm">
                  Aulas em horários adaptados para trabalhadores e ministros
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Turmas Reduzidas</h3>
                <p className="text-muted-foreground text-sm">
                  Atenção personalizada com turmas de no máximo 30 alunos
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">Certificação</h3>
                <p className="text-muted-foreground text-sm">
                  Certificado reconhecido ao concluir cada módulo
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cursos;
