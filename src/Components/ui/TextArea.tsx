import React, { forwardRef } from "react";
import { cn } from "../../util/cn.ts";

type TextAreaVarient = "filled" | "outlined";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  varient?: TextAreaVarient;
  className?: string;
}

let TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ varient, className, ...props }, ref) => {
    let baseClasses =
      "custom-scroll-area h-20 w-full resize-none rounded border-0 px-[6px] py-1 text-sm text-text-color outline-none transition-border duration-200 placeholder:font-light placeholder:opacity-50";

    let varientClasses: Record<TextAreaVarient, string> = {
      filled:
        "border-transparent bg-secondary placeholder:text-on-secondary border-b-2 focus-within:border-primary",
      outlined:
        "border border-border placeholder:text-text-color bg-transparent focus-within:border-primary",
    };

    let classes = cn([
      baseClasses,
      varientClasses[varient || "filled"],
      className,
    ]);

    return <textarea ref={ref} className={classes} {...props}></textarea>;
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
