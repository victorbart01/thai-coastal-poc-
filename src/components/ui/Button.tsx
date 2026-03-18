import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-glass-deep to-accent-pink text-white shadow-sm hover:brightness-110",
  secondary:
    "border border-black/[0.10] bg-white/60 text-text-primary hover:bg-white/80",
  ghost:
    "text-text-secondary hover:bg-black/[0.04] hover:text-text-primary",
  danger:
    "bg-danger/10 text-danger hover:bg-danger/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-7 py-3 text-sm gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pill = false, className = "", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-semibold font-display transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
    const radius = pill ? "rounded-full" : "rounded-lg";

    return (
      <button
        ref={ref}
        className={`${base} ${radius} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
