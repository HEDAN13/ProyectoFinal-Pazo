import "./ButtonPrimary.css";

export default function ButtonPrimary({
  children,
  onClick,
  disabled,
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={className ?? "buttonPrimary"}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
