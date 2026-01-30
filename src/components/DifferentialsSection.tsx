import { Calendar, Users, Laptop, Award } from "lucide-react";

const differentials = [
  {
    icon: Calendar,
    title: "Módulos Trimestrais",
    description: "Estrutura organizada em trimestres que permite um aprendizado gradual e consistente ao longo do ano.",
  },
  {
    icon: Users,
    title: "Abertura para Todos",
    description: "Nosso curso é aberto a todos que desejam crescer no conhecimento bíblico, independente de denominação.",
  },
  {
    icon: Laptop,
    title: "Modelo Híbrido",
    description: "Flexibilidade de estudar presencialmente ou online, adaptando-se à sua rotina e necessidades.",
  },
  {
    icon: Award,
    title: "Professores Qualificados",
    description: "Corpo docente com formação teológica avançada e experiência ministerial comprovada.",
  },
];

const DifferentialsSection = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Nossos Diferenciais
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary mt-4 mb-6">
            Por Que Escolher fazer o curso de{" "}
            <span className="text-accent">Teologia</span> conosco?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Oferecemos uma formação completa que combina rigor acadêmico com aplicação prática ministerial.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 border border-border"
            >
              <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <item.icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
