import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "warning";
  href?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  href,
  className,
  ...props
}) => {
  const variantClasses = {
    primary:
      "bg-emerald-800 text-white px-4 py-0.5 rounded-md min-w-24 cursor-pointer hover:bg-emerald-900 duration-300 text-sm",
    secondary:
      "bg-white text-neutral-500 border border-neutral-500 min-w-24 px-4 py-0.5 rounded-md cursor-pointer hover:bg-neutral-200 duration-300 text-sm",
    warning:
      "bg-white text-red-500 border border-red-600 min-w-24 px-4 py-0.5 rounded-md cursor-pointer hover:bg-red-600 hover:text-white duration-300 text-sm",
  };

  const variantClassName = variantClasses[variant];

  if (href) {
    return (
      <a
        href={`${href}`}
        className={clsx(variantClassName, className, "text-center")}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...props}
      className={clsx(variantClassName, className, "cursor-pointer")}
    >
      {children}
    </button>
  );
};

export default Button;
