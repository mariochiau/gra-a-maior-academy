import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Users, Award, Heart, Target, Eye } from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Fidelidade às Escrituras",
    description: "Compromisso inabalável com a Palavra de Deus como autoridade suprema.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Ambiente de aprendizado colaborativo e apoio mútuo entre estudantes e professores.",
  },
  {
    icon: Award,
    title: "Excelência Acadêmica",
    description: "Padrões elevados de ensino com rigor metodológico e pedagógico.",
  },
  {
    icon: Heart,
    title: "Serviço",
    description: "Formação orientada para o serviço ao próximo e à igreja de Cristo.",
  },
];

const Sobre = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Quem Somos
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6">
                Instituto Bíblico{" "}
                <span className="text-accent">Graça Maior</span>
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Formando líderes cristãos para o tempo e a eternidade desde 2010.
              </p>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Nossa História
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-4 mb-6">
                  Uma Jornada de Fé e Dedicação
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    O Instituto Bíblico Graça Maior nasceu do desejo ardente de 
                    proporcionar formação teológica de qualidade em Moçambique. 
                    Fundado em 2010, nossa instituição surgiu da visão de líderes 
                    cristãos comprometidos com o crescimento espiritual e acadêmico 
                    da igreja local.
                  </p>
                  <p>
                    Ao longo dos anos, temos formado centenas de pastores, líderes 
                    de ministério e cristãos comprometidos que hoje servem em 
                    diversas denominações por todo o país e além-fronteiras.
                  </p>
                  <p>
                    Nossa metodologia combina ensino presencial e online, permitindo 
                    que estudantes de diferentes localidades tenham acesso a uma 
                    formação teológica sólida e transformadora.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary to-navy-light rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-7xl font-serif font-bold text-accent mb-4">15+</p>
                    <p className="text-xl text-primary-foreground">Anos de História</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-card rounded-2xl p-10 shadow-card">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Nossa Missão
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Formar líderes cristãos equipados com conhecimento bíblico-teológico 
                  sólido e habilidades ministeriais práticas, capacitando-os para servir 
                  a Igreja de Cristo e impactar a sociedade moçambicana com os valores 
                  do Reino de Deus.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card rounded-2xl p-10 shadow-card">
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Nossa Visão
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecido como referência em educação teológica em Moçambique 
                  e na região, contribuindo para o fortalecimento da Igreja através 
                  de líderes bem preparados, comprometidos com a Palavra de Deus e 
                  com a transformação social.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Nossos Valores
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mt-4">
                O Que Nos Move
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                    <value.icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
