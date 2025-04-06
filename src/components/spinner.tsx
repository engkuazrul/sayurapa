import { cva } from "class-variance-authority";
import { LucideLoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export function Spinner({
  size,
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const spinnerVariants = cva("animate-spin", {
    variants: {
      size: {
        sm: "h-8 w-8",
        md: "h-12 w-12",
        lg: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "md",
    },
  });

  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center self-center">
      <LucideLoaderCircle
        className={cn(spinnerVariants({ size, className }))}
      />
    </div>
  );
}
