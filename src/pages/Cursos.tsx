import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Users, Award, Check, ArrowRight } from "lucide-react";

const courses = [
  {
    id: "trimestre",
    title: "Curso Trimestral",
    subtitle: "Formação Intensiva",
    price: "1.100,00",
    currency: "MT",
    duration: "3 meses",
    features: [
      "Módulos completos por trimestre",
      "Material didático incluso",
      "Aulas presenciais e online",
      "Certificado de conclusão",
      "Acesso à biblioteca digital",
      "Acompanhamento pastoral",
    ],
    highlight: false,
  },
  {
    id: "semestre",
    title: "Curso Semestral",
    subtitle: "Formação Completa",
    price: "1.600,00",
    currency: "MT",
    duration: "6 meses",
    features: [
      "Dois módulos completos",
      "Material didático premium",
      "Aulas presenciais e online",
      "Certificado de conclusão",
      "Acesso ilimitado à biblioteca",
      "Mentoria individual",
      "Participação em eventos",
      "Desconto em materiais extras",
    ],
    highlight: true,
  },
];

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
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
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

        {/* Pricing Cards */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`relative rounded-2xl p-8 transition-all duration-300 ${
                    course.highlight
                      ? "bg-primary text-primary-foreground shadow-card scale-105"
                      : "bg-card shadow-soft hover:shadow-card"
                  }`}
                >
                  {course.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-primary text-sm font-semibold px-4 py-1 rounded-full">
                        Mais Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-serif font-bold mb-2 ${
                      course.highlight ? "text-primary-foreground" : "text-primary"
                    }`}>
                      {course.title}
                    </h3>
                    <p className={`text-sm ${
                      course.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {course.subtitle}
                    </p>
                  </div>

                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-5xl font-bold ${
                        course.highlight ? "text-accent" : "text-primary"
                      }`}>
                        {course.price}
                      </span>
                      <span className={course.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}>
                        {course.currency}
                      </span>
                    </div>
                    <div className={`flex items-center justify-center gap-2 mt-2 text-sm ${
                      course.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          course.highlight ? "bg-accent" : "bg-accent/10"
                        }`}>
                          <Check className={`w-3 h-3 ${
                            course.highlight ? "text-primary" : "text-accent"
                          }`} />
                        </div>
                        <span className={`text-sm ${
                          course.highlight ? "text-primary-foreground/90" : "text-foreground/80"
                        }`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/inscricoes">
                    <Button
                      className={`w-full py-6 text-lg ${
                        course.highlight
                          ? "btn-gold"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      Inscrever-se
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              ))}
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
