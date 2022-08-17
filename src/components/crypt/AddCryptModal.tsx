import "../generic/cryptModal.scss";

import cross from "../generic/cross.svg";
import React, { useState } from "react";
import Modal from "../generic/Modal";
import { useDispatch } from "react-redux";
import { addCryptToWallet } from "../../lib/actions/walletActions";
import checkInputSymbol from "../generic/checkInputSymbol";
import { Crypt, CryptFromFetch } from "../../types";

export interface AddCryptModalProps {
  isPopupOpen: boolean;
  setIsPopupOpen: (flag: boolean) => void;
  cryptAbout: CryptFromFetch;
}

export default function AddCryptModal({
  isPopupOpen,
  setIsPopupOpen,
  cryptAbout,
}: AddCryptModalProps) {
  const [amount, setAmount] = useState("");
  const [error, setErorr] = useState(false);

  const dispatch = useDispatch();

  function closePopup() {
    setIsPopupOpen(false);
    setErorr(false);
    setAmount("");
  }

  function onSubmit(e: React.MouseEvent) {
    e.preventDefault();

    let isItemUnique = true;

    const { id, name, priceUsd, changePercent24Hr } = cryptAbout;
    const obj = {
      id,
      name,
      price: priceUsd,
      amount: +amount,
      change: changePercent24Hr,
    };

    if (amount) {
      dispatch(addCryptToWallet(obj));

      const walletGet = localStorage.getItem("wallet");

      if (walletGet) {
        const correctWallet = JSON.parse(walletGet);

        correctWallet.forEach((item: Crypt) => {
          if (item.id === obj.id) {
            item.amount += obj.amount;
            isItemUnique = false;
          }
        });

        isItemUnique && correctWallet.push(obj);
        localStorage.setItem("wallet", JSON.stringify([...correctWallet]));
      } else localStorage.setItem("wallet", JSON.stringify([obj]));

      setIsPopupOpen(false);
      setErorr(false);
      setAmount("");
    } else setErorr(true);
  }

  function onChange(e: any) {
    if (!checkInputSymbol(e.target.value)) {
      return null;
    }

    setAmount(e.target.value);
    setErorr(e.target.value === "" ? true : false);
  }

  return (
    <Modal setIsPopupOpen={closePopup} isPopupOpen={isPopupOpen}>
      <div className="modal-header">
        <div className="modal__title">Add {cryptAbout?.name} to Wallet</div>
        <img
          src={cross}
          alt="cross"
          className="modal__cross"
          onClick={() => closePopup()}
        />
      </div>
      <div className="modal-body">
        <p className="modal__about">
          {cryptAbout?.name} price - {(+cryptAbout?.priceUsd).toFixed(5)}$
        </p>
        <form action="submit">
          <input
            className={`modal__input ${error ? "error" : ""}`}
            type="text"
            value={amount}
            onChange={(e) => onChange(e)}
            placeholder="Amount of Cryptocurrency"
          />
          <p className="rules">Min value - 0.00001. Max value - 100000</p>
          <button className="modal__button" onClick={(e) => onSubmit(e)}>
            Add to Wallet
          </button>
        </form>
      </div>
    </Modal>
  );
}
