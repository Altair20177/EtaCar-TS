import { ButtonSizes, ButtonTypes } from "../../../types";
import "./button.scss";

export interface ButtonProps {
  size?: string;
  buttonType?: string;
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
}

export default function Button({
  size = ButtonSizes.size_md,
  children = null,
  buttonType = ButtonTypes.button_pagination,
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
