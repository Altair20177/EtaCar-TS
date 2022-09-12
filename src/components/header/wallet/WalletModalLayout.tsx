import "./walletModal.scss";

import cross from "../../generic/icons/cross.svg";
import { ButtonSizes, ButtonTypes, Crypt, TableTypes } from "../../../types";
import Button from "../../generic/button/Button";
import Table from "../../generic/table/Table";
import PieChart from "../pieChart/PieChart";

export interface WalletModalLayoutProps {
  walletData: Array<Crypt>;
  closePopup: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    cryptToDelete: Crypt
  ) => void;
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
          <p className="modal__rules">
            Minimal value - 0.00001. Maximal value -{" "}
            {cryptToDelete.amount < 999999
              ? Math.floor(cryptToDelete.amount * 10000) / 10000
              : "999999"}
            .
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="submit"
            className="form-delete"
          >
            <input
              value={deleteAmount}
              onChange={(e) => onChange(e, cryptToDelete)}
              type="text"
              className={`form-delete__input ${error ? "error" : ""}`}
              placeholder={`Remove ${cryptToDelete.name}`}
            />
            <Button
              type="submit"
              onClick={deleteCrypt}
              buttonType={ButtonTypes.button_delete}
              size={ButtonSizes.size_sm}
            >
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
            type={TableTypes.table_wallet}
            headers={createDataForTableWallet().headers}
            lines={createDataForTableWallet(walletData).lines}
            onCustomClick={deleteCryptRequest}
            fontWeight="table_weight_normal"
            lineHeight="table_height_low"
          />
          {walletData?.length !== 0 && (
            <div className="modal-pie">
              <PieChart data={walletData} />
            </div>
          )}
        </div>
      )}
    </>
  );
}
