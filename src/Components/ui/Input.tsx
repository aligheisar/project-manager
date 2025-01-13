import React, { forwardRef } from "react";
import clsx from "clsx";

type InputVarient = "filled" | "outlined";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  varient?: InputVarient;
  className?: string;
}

let Input = forwardRef<HTMLInputElement, InputProps>(
  ({ varient, className, ...props }, ref) => {
    let baseClasses =
      "border-0 px-3 h-10 text-text-color outline-none placeholder:font-light placeholder:opacity-50 transition-border duration-200";

    let varientClasses: Record<InputVarient, string> = {
      filled:
        "border-transparent bg-secondary placeholder:text-on-secondary border-b-2 focus-within:border-primary",
      outlined:
        "border-[1px] border-border placeholder:text-text-color bg-transparent focus-within:border-primary",
    };

    let classes = clsx(
      baseClasses,
      varientClasses[varient || "filled"],
      className,
    );
    return <input ref={ref} className={classes} {...props} />;
  },
);

Input.displayName = "Input";

export default Input;
