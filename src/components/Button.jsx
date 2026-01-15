import "./button.css";

export default function Button({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    ...props
}) {
    return (
        <button
            className={`btn btn--${variant} btn--${size}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
