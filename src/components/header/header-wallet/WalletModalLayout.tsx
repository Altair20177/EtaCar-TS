import "./walletModal.scss";

import cross from "../../generic/cross.svg";
import crossDelete from "./cross_delete.svg";
import { Crypt } from "../../../types";

export interface WalletModalLayoutProps {
  walletData: Array<Crypt>;
  closePopup: () => void;
  onChange: (e: any) => void;
  deleteCrypt: () => void;
  deleteCryptRequest: (crypt: Crypt) => void;
  error: boolean;
  requestToDelete: boolean;
  deleteAmount: string | number;
  cryptToDelete: Crypt | null;
}

export default function WalletModalLayout({
  walletData,
  closePopup,
  onChange,
  deleteCrypt,
  deleteCryptRequest,
  error,
  requestToDelete,
  deleteAmount,
  cryptToDelete,
}: WalletModalLayoutProps) {
  return (
    <>
      <div className="modal-header">
        <div className="modal__title">Your Wallet</div>
        <img
          src={cross}
          alt="cross"
          className="modal__cross"
          onClick={closePopup}
        />
      </div>
      {requestToDelete && cryptToDelete ? (
        <>
          <p className="rules">
            Minimal value - 0.00001. Maximal value - 999999.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="submit"
            className="delete"
          >
            <input
              value={deleteAmount}
              onChange={(e) => onChange(e)}
              type="text"
              className={`delete__input ${error ? "error" : ""}`}
              placeholder={`Remove ${cryptToDelete.name}`}
            />
            <button onClick={deleteCrypt} className="delete__confirm">
              Remove
            </button>
          </form>
        </>
      ) : null}
      {walletData.length === 0 ? (
        <p className="wallet__empty">Wallet is Empty</p>
      ) : (
        <div className="modal-body">
          <div className="modal-line table__header">
            <p className="name">Name</p>
            <p className="amount">Amount</p>
            <p className="price">Price</p>
            <p className="price__total">Total Price</p>
            <p>Remove</p>
          </div>
          <div className="modal-table">
            {walletData.map((crypt: Crypt) => (
              <div className="modal-line" key={crypt.id}>
                <p className="name">{crypt.name}</p>
                <p className="amount">
                  {Math.floor(crypt.amount * 10000) / 10000}
                </p>
                <p className="price">
                  {Math.floor(+crypt.price * 100000) / 100000}$
                </p>
                <p className="price__total">
                  {Math.floor(+crypt.price * crypt.amount * 10000) / 10000}$
                </p>
                <div onClick={() => deleteCryptRequest(crypt)}>
                  <img className="remove" src={crossDelete} alt="cross" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
