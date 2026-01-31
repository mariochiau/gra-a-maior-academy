import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminStatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  color: "blue" | "green" | "orange" | "purple";
}

const colorClasses = {
  blue: "bg-blue-500/10 text-blue-600",
  green: "bg-green-500/10 text-green-600",
  orange: "bg-orange-500/10 text-orange-600",
  purple: "bg-purple-500/10 text-purple-600",
};

const iconBgClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
};

const AdminStatsCard = ({
  icon: Icon,
  label,
  value,
  change,
  changeType = "neutral",
  color,
}: AdminStatsCardProps) => {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm mt-2",
                changeType === "positive" && "text-green-600",
                changeType === "negative" && "text-red-600",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconBgClasses[color]
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;
