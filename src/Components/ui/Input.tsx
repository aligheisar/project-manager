import React, { forwardRef } from "react";
import clsx from "clsx";

type ButtonVarient = "filled" | "outlined" | "tonal";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  varient?: ButtonVarient;
  className?: string;
}

let Input = forwardRef<HTMLInputElement, InputProps>(
  ({ varient = "filled", className, ...props }, ref) => {
    let baseClasses =
      "px-2 py-[6px] outline-none placeholder:transition-colors";
    let varientClasses: Record<ButtonVarient, string> = {
      filled: "",
      outlined: "",
      tonal: "",
    };

    let dd = 
      "border-2 border-gray-400 bg-gray-100 shadow-md shadow-black/10 focus-within:border-gray-600 focus-within:placeholder:text-gray-700 max-vsm:text-sm";

    let classes = clsx(baseClasses, varientClasses[varient], className);
    return <input ref={ref} className={classes} {...props} />;
  },
);

Input.displayName = "Input";

export default Input;
