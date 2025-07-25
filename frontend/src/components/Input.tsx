const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <input
      {...props}
      className="border border-neutral-300 rounded-md p-1 flex-grow"
    />
  );
};

export default Input;
