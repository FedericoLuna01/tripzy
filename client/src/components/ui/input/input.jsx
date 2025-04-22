import "./input.css";

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "Ingrese el dato acá...",
  className,
  id,
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      id={id}
      {...props}
    />
  );
};

export default Input;
