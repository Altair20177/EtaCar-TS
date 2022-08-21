import "./button.scss";

export interface ButtonProps {
  size?: string;
  type: string;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  active?: boolean;
}

export default function Button({
  size = "md",
  children = null,
  type = "pagination__item",
  onClick,
  active = false,
}: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`button__wrapper ${size} ${type} ${
        active ? "active_page" : ""
      }`}
    >
      {children}
    </div>
  );
}
