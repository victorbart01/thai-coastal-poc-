import { forwardRef, type HTMLAttributes } from "react";

type CardVariant = "glass" | "dark" | "surface";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  glass: "glass-card",
  dark: "bg-navy-900 border border-white/[0.08] text-white",
  surface: "glass-surface",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "glass", className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
export { Card, type CardProps, type CardVariant };
