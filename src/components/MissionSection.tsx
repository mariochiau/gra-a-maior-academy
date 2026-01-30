import { Check } from "lucide-react";

const missionPoints = [
  "Formar líderes cristãos comprometidos com a Palavra de Deus",
  "Promover uma educação teológica acessível e de qualidade",
  "Desenvolver habilidades ministeriais práticas para o serviço cristão",
  "Fortalecer a fé através do estudo sistemático das Escrituras",
  "Preparar homens e mulheres para o ministério pastoral e missionário",
  "Cultivar uma vida devocional profunda e transformadora",
  "Impactar a comunidade local através do testemunho cristão",
];

const MissionSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Nossa Missão
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mt-4 mb-6">
              Compromisso com a{" "}
              <span className="text-accent">Excelência</span> e a{" "}
              <span className="text-accent">Fé</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              O Instituto Bíblico Graça Maior existe para equipar a Igreja de Cristo 
              com líderes bem preparados, fundamentados nas Escrituras Sagradas e 
              comprometidos com a transformação da sociedade.
            </p>

            {/* Mission Points */}
            <ul className="space-y-4">
              {missionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent transition-colors duration-300">
                    <Check className="w-4 h-4 text-accent group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="text-foreground/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-card">
              {/* Placeholder for image - using a gradient background */}
              <div className="aspect-[4/5] bg-gradient-to-br from-primary via-navy-light to-primary flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-5xl font-serif font-bold text-accent">✝</span>
                  </div>
                  <blockquote className="text-primary-foreground/90 text-xl font-serif italic max-w-sm mx-auto">
                    "Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade."
                  </blockquote>
                  <cite className="text-accent text-sm mt-4 block">
                    — 2 Timóteo 2:15
                  </cite>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
