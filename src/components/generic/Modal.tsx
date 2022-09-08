import "./cryptModal.scss";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  setIsPopupOpen: (flag: boolean) => void;
  isPopupOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({
  children,
  setIsPopupOpen,
  isPopupOpen,
}: ModalProps) {
  return (
    <div
      className={`modal-wrapper ${isPopupOpen ? "open" : ""}`}
      onClick={() => setIsPopupOpen(false)}
    >
      <div
        className={`modal-content ${isPopupOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
