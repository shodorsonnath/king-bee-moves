/* eslint-disable @typescript-eslint/no-explicit-any */
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon | string | any;
  change: number;
  color: "orange" | "blue" | "teal" | "red";
  progress?: number;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  color,
  progress = 50,
}: MetricCardProps) {

  const getProgressColor = (color: string) => {
    const classes = {
      orange: "bg-primary",
      blue: "bg-[#5978EC]",
      teal: "bg-[#35C2CF]",
      red: "bg-[#FC4534]",
    };
    return classes[color as keyof typeof classes];
  };

  return (
    <Card>
      <CardContent className="pt-6 text-text_color">

      <div className="flex justify-between">
        {/* first card */}
          {/* card icon */}
          <div className="flex items-center mb-4 gap-3">
          <div className={`p-3 rounded-full bg-[#ECF5FA]`}>
            <Image src={Icon} alt="icon" className="w-7 h-7" />
          </div>
          {/* icon left side text */}
          <div className="space-y-3">
            <p className="text-sm font-medium">{title}</p>
            <h2 className="text-xl lg:text-2xl font-extrabold text-heading_color">
              {value.toLocaleString()}
            </h2>
          </div>
        </div>
        {/* second card */}
        <div className="space-y-2 mt-1">
          <div className="h-2 rounded-full bg-muted">
            <div
              className={`h-2 rounded-full ${getProgressColor(color)}`}
              style={{ width: `${progress}%` }}
            />
          </div>
         <div className="space-y-1">
         <div className="flex items-center">
            <span
              className={`ml-auto text-[12px] font-medium px-2 rounded-md text-[#1F3045] ${change >= 0 ? "bg-[#C4E6F8]" : "bg-red-100"
                }`}
            >
              {change >= 0 ? "+" : ""}
              {change}%
            </span>
          </div>
          <p className="text-end text-sm">from last month</p>
         </div>
        </div>
      </div>




      </CardContent>
    </Card>
  );
}
