import { BookOpen } from "lucide-react";

interface WelcomeBannerProps {
  userName: string;
}

const WelcomeBanner = ({ userName }: WelcomeBannerProps) => {
  const firstName = userName?.split(" ")[0] || "Aluno";

  return (
    <div className="bg-gradient-to-r from-primary via-navy-light to-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 18v-6h-2v6h-6v2h6v6h2v-6h6v-2h-6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-primary-foreground/80 text-sm mb-1">Bem-vindo de volta,</p>
          <h2 className="text-2xl font-serif font-bold">{firstName}!</h2>
          <p className="text-primary-foreground/70 text-sm mt-2">
            Continue sua jornada de aprendizado
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
          <BookOpen className="w-8 h-8 text-accent" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
