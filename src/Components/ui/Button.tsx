import clsx from "clsx";
import React, { forwardRef } from "react";

type ButtonVarient = "filled" | "outlined" | "tonal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  varient?: ButtonVarient;
  className?: string;
}

let Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ varient = "filled", className, children, ...props }, ref) => {
    let baseClasses =
      "flex items-center h-10 justify-center gap-2 rounded-[4px] px-6 font-medium outline-none transition-colors-shaow duration-150 disabled:opacity-50 disabled:pointer-events-none";

    let varientClasses: Record<ButtonVarient, string> = {
      filled:
        "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
      outlined:
        "border border-1 bg-white/0 border-border text-primary hover:bg-white/5 hover:border-border-hover active:bg-white/10 active:border-border-active",
      tonal:
        "bg-secondary text-on-secondary hover:bg-secondary-hover hover:shadow-md active:bg-secondary-active active:shadow-none",
    };

    let classes = clsx(baseClasses, varientClasses[varient], className);

    return (
      <button ref={ref} {...props} className={classes}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
