import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Quais são os requisitos para se inscrever?",
    answer: "Nosso curso é aberto a todos os interessados em aprofundar seus conhecimentos bíblicos. Não há requisitos prévios de formação teológica. Basta ter no mínimo 18 anos, saber ler e escrever, e ter desejo de aprender.",
  },
  {
    question: "O curso é presencial ou online?",
    answer: "Oferecemos um modelo híbrido. Você pode assistir às aulas presencialmente em nossa sede em Maputo ou participar online através de nossa plataforma de ensino. Os materiais didáticos estão disponíveis em ambas as modalidades.",
  },
  {
    question: "Qual a duração do curso?",
    answer: "Oferecemos duas opções: o Curso Trimestral (3 meses) por 1.100,00 MT e o Curso Semestral (6 meses) por 1.600,00 MT. O programa completo de formação teológica pode ser concluído em aproximadamente 2 anos.",
  },
  {
    question: "Como funciona o pagamento?",
    answer: "O pagamento pode ser feito via transferência bancária, M-Pesa ou em espécie em nossa secretaria. Oferecemos a possibilidade de parcelamento para facilitar o acesso à formação.",
  },
  {
    question: "O certificado é reconhecido?",
    answer: "Sim, ao concluir cada módulo você recebe um certificado de conclusão do Instituto Bíblico Graça Maior. Nosso certificado é reconhecido por diversas denominações e instituições cristãs.",
  },
  {
    question: "Posso começar a qualquer momento?",
    answer: "As turmas iniciam a cada trimestre. Recomendamos fazer a inscrição com antecedência para garantir sua vaga. Entre em contacto conosco para saber as datas de início das próximas turmas.",
  },
  {
    question: "Há desconto para grupos ou igrejas?",
    answer: "Sim, oferecemos condições especiais para grupos de 5 ou mais pessoas da mesma igreja ou comunidade. Entre em contacto conosco para saber mais sobre os descontos disponíveis.",
  },
  {
    question: "Qual a carga horária semanal?",
    answer: "As aulas ocorrem geralmente aos sábados, com uma carga horária de aproximadamente 4 horas por semana. Além das aulas, recomendamos dedicar algumas horas semanais aos estudos individuais.",
  },
  {
    question: "Preciso ter computador para o curso online?",
    answer: "Para as aulas online, você pode usar um computador, tablet ou smartphone. Nossa plataforma é responsiva e funciona bem em dispositivos móveis. Você precisará de uma conexão estável à internet.",
  },
  {
    question: "Como faço para tirar dúvidas durante o curso?",
    answer: "Você terá acesso direto aos professores durante as aulas. Além disso, disponibilizamos canais de comunicação como WhatsApp e e-mail para dúvidas fora do horário de aula.",
  },
];

const FAQ = () => {
  const whatsappNumber = "258879113748";
  const whatsappMessage = encodeURIComponent(
    "Olá! Tenho uma dúvida sobre o curso de Teologia do Instituto Bíblico Graça Maior."
  );

  return (
    <div className="min-h-screen pt-20">
      <main>
        {/* Hero */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Perguntas Frequentes
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mt-4 mb-6">
                Tire Suas{" "}
                <span className="text-accent">Dúvidas</span>
              </h1>
              <p className="text-xl text-primary-foreground/80">
                Encontre respostas para as perguntas mais comuns sobre nossos cursos.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl px-6 border border-border shadow-soft"
                  >
                    <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* CTA */}
              <div className="mt-16 text-center p-8 bg-card rounded-2xl shadow-card">
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                  Ainda tem dúvidas?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe está pronta para ajudá-lo. Entre em contacto!
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
