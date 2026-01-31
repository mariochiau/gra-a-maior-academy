import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  thumbnail?: string;
  onContinue: () => void;
}

const CourseCard = ({
  title,
  instructor,
  progress,
  totalLessons,
  completedLessons,
  thumbnail,
  onContinue,
}: CourseCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-primary to-navy-light">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-8 h-8 text-accent ml-1" />
            </div>
          </div>
        )}
        {/* Progress overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-foreground/20">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{instructor}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{completedLessons}/{totalLessons} aulas</span>
          </div>
          <Button
            size="sm"
            onClick={onContinue}
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-4"
          >
            <Play className="w-4 h-4 mr-1" />
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
