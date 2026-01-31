import { BookOpen, Flame, Clock, Trophy } from "lucide-react";

interface StatsCardsProps {
  lessonsCompleted: number;
  streak: number;
  hoursWatched: number;
  certificates: number;
}

const StatsCards = ({ lessonsCompleted, streak, hoursWatched, certificates }: StatsCardsProps) => {
  const stats = [
    {
      icon: BookOpen,
      value: lessonsCompleted,
      label: "Lições",
      color: "bg-blue-500/10 text-blue-600",
      iconBg: "bg-blue-500",
    },
    {
      icon: Flame,
      value: streak,
      label: "Sequência",
      sublabel: "dias",
      color: "bg-orange-500/10 text-orange-600",
      iconBg: "bg-orange-500",
    },
    {
      icon: Clock,
      value: hoursWatched,
      label: "Horas",
      color: "bg-purple-500/10 text-purple-600",
      iconBg: "bg-purple-500",
    },
    {
      icon: Trophy,
      value: certificates,
      label: "Certificados",
      color: "bg-amber-500/10 text-amber-600",
      iconBg: "bg-amber-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-xl p-4 shadow-sm border border-border"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                {stat.label}
                {stat.sublabel && <span className="ml-1">{stat.sublabel}</span>}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
