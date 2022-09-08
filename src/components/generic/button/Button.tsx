import { ButtonSizes, ButtonTypes } from "../../../types";
import "./button.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizes.size_lg | ButtonSizes.size_md | ButtonSizes.size_sm;
  buttonType?:
    | ButtonTypes.button_pagination
    | ButtonTypes.button_delete
    | ButtonTypes.button_action
    | ButtonTypes.button_slide;
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
