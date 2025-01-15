import clsx from "clsx";
import { forwardRef } from "react";

let Backdrop = forwardRef(({ children, onClose, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => onClose?.()}
      className={clsx("fixed inset-0", className)}
      {...props}
    >
      {children}
    </div>
  );
});

export default Backdrop;
