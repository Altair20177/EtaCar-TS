import "./walletModal.scss";

import cross from "../../generic/genericIcons/cross.svg";
import { Crypt } from "../../../types";
import Button from "../../generic/genericButton/Button";
import Table from "../../generic/genericTable/Table";

export interface WalletModalLayoutProps {
  walletData: Array<Crypt>;
  closePopup: () => void;
  onChange: (e: any) => void;
  deleteCrypt: () => void;
  deleteCryptRequest: (index: number) => void;
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
  function createDataForTableWallet(walletData?: Array<Crypt>) {
    const data: { headers: string[]; lines: string[][] } = {
      headers: ["Name", "Amount", "Price", "Total Price", "Remove"],
      lines: [],
    };

    walletData &&
      walletData.forEach((crypt) => {
        const obj = {
          name: crypt.name,
          amount: String(Math.round(crypt.amount * 100000) / 100000),
          price: String((+crypt.price).toFixed(5)) + "$",
          totalPrice: String((crypt.amount * +crypt.price).toFixed(4)) + "$",
        };

        const arr: string[] = [...Object.values(obj)];
        data.lines.push(arr);
      });

    return data;
  }

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
            <Button onClick={deleteCrypt} type="delete__crypt" size="sm">
              Remove
            </Button>
          </form>
        </>
      ) : null}
      {walletData.length === 0 ? (
        <p className="wallet__empty">Wallet is Empty</p>
      ) : (
        <div className="modal-body">
          <Table
            type="wallet-modal"
            headers={createDataForTableWallet().headers}
            lines={createDataForTableWallet(walletData).lines}
            onClick={deleteCryptRequest}
          />
        </div>
      )}
    </>
  );
}
