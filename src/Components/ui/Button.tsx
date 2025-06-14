import React, { forwardRef, ReactNode } from "react";
import { cn } from "../../util/cn.ts";

type ButtonVarient = "filled" | "outlined" | "tonal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: ButtonVarient;
  Icon: ReactNode;
  className?: string;
}

let Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ varient, Icon, className, children, ...props }, ref) => {
    let baseClasses = `flex items-center h-10 justify-center gap-2 rounded ${Icon ? "pl-5 pr-6" : "px-6"} font-medium outline-none transition-colors-shaow duration-150 disabled:opacity-50 disabled:pointer-events-none`;

    let varientClasses: Record<ButtonVarient, string> = {
      filled:
        "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
      outlined:
        "border bg-text-color/0 border-border/65 text-primary hover:bg-text-color/5 hover:border-border/75 active:bg-text-color/10 active:border-border/95",
      tonal:
        "bg-secondary text-on-secondary hover:bg-secondary-hover hover:shadow-md active:bg-secondary-active active:shadow-none",
    };

    let classes = cn([
      baseClasses,
      varientClasses[varient || "filled"],
      className,
    ]);

    return (
      <button ref={ref} {...props} className={classes}>
        {Icon}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
