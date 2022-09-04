import "./button.scss";

export interface ButtonProps {
  size?: string;
  buttonType?: string;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
}

export default function Button({
  size = "md",
  children = null,
  buttonType = "pagination__item",
  onClick,
  active = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`button__wrapper ${size} ${buttonType} ${
        active ? "active_page" : ""
      }`}
    >
      {children}
    </button>
  );
}
