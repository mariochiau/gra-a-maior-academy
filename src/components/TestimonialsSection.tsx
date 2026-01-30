import { Play, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Pastor João Silva",
    role: "Formando 2023",
    quote: "O Instituto Bíblico Graça Maior transformou minha vida ministerial. A qualidade do ensino e o comprometimento dos professores são excepcionais.",
    videoThumbnail: null,
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Formanda 2022",
    quote: "Encontrei no IBGM não apenas conhecimento teológico, mas uma família de fé que me apoia em cada passo do meu ministério.",
    videoThumbnail: null,
  },
  {
    id: 3,
    name: "Rev. Pedro Nhaca",
    role: "Formando 2021",
    quote: "A flexibilidade do modelo híbrido me permitiu continuar trabalhando enquanto me formava. Sou eternamente grato.",
    videoThumbnail: null,
  },
];

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Testemunhos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mt-4 mb-6">
            O Que Os Nossos{" "}
            <span className="text-accent">Estudantes</span> Dizem
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Histórias reais de transformação e crescimento espiritual de nossos alunos.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              onClick={() => setActiveTestimonial(index)}
              className={`relative rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                activeTestimonial === index
                  ? "bg-accent text-primary scale-105 shadow-gold"
                  : "bg-primary-foreground/5 hover:bg-primary-foreground/10"
              }`}
            >
              {/* Quote Icon */}
              <Quote
                className={`w-10 h-10 mb-4 ${
                  activeTestimonial === index ? "text-primary/30" : "text-accent/30"
                }`}
              />

              {/* Video Play Button (for video testimonials) */}
              {testimonial.videoThumbnail && (
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary ml-1" />
                  </div>
                </div>
              )}

              {/* Quote */}
              <blockquote
                className={`text-lg font-medium mb-6 leading-relaxed ${
                  activeTestimonial === index ? "text-primary" : "text-primary-foreground/90"
                }`}
              >
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    activeTestimonial === index
                      ? "bg-primary text-accent"
                      : "bg-accent text-primary"
                  }`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      activeTestimonial === index ? "text-primary" : "text-primary-foreground"
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-sm ${
                      activeTestimonial === index ? "text-primary/70" : "text-primary-foreground/60"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Gallery Note */}
        <div className="mt-16 text-center">
          <p className="text-primary-foreground/60 text-sm">
            Clique em um testemunho para destacá-lo • Em breve, vídeos disponíveis
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
