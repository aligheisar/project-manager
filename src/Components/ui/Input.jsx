import { forwardRef } from "react";

let Input = forwardRef(
  ({ type = "text", placeholder, className, ...prop }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex-1 border-2 border-gray-400 bg-gray-100 px-2 py-[6px] shadow-md shadow-black/10 outline-none placeholder:transition-colors focus-within:border-gray-600 focus-within:placeholder:text-gray-700 max-vsm:text-sm ${className}`}
        type={type}
        placeholder={placeholder}
        {...prop}
      />
    );
  },
);

export default Input;
