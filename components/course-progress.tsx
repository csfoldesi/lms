import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface CourseProgressProps {
  variant: "success" | "default";
  value: number;
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-emerald-700",
  success: "text-sky-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({ variant, size, value }: CourseProgressProps) => {
  return (
    <div>
      <Progress variant={variant} className="h-2" value={value} />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}>
        {Math.round(value)}% complete
      </p>
    </div>
  );
};
