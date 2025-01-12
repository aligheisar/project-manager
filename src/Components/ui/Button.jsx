let Button = ({
  dark = false,
  varient,
  className,
  onClick,
  children,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      {...props}
    className={`flex items-center justify-center gap-2 rounded-[4px] px-3 py-[6px] font-medium shadow-md shadow-black/5 outline-none transition-colors duration-150 ${dark ? "bg-gray-800 fill-gray-300 text-gray-300 hover:bg-gray-700" : "bg-gray-200 fill-gray-900 text-gray-900 hover:bg-gray-300"} ${varient === "danger" ? "hover:fill-red-500 hover:text-red-500" : varient === "dim" ? "bg-gray-800/20 text-gray-800 hover:bg-gray-800/25" : varient === "colored" ? "bg-gray-700 text-gray-100 hover:bg-gray-800" : varient === "delete" ? "text-gray-100 bg-red-700/80 hover:bg-red-700/90" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
