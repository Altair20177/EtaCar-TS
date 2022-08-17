import "../main.scss";

import arrowUp from "./arrow_up.svg";
import arrowDown from "./arrow_down.svg";
import { useNavigate } from "react-router";
import AddCryptModal from "../../crypt/AddCryptModal";
import { useState } from "react";
import { CryptFromFetch } from "../../../types";

export interface TableProps {
  dataToShow: Array<CryptFromFetch>;
}

export default function Table({ dataToShow }: TableProps) {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cryptAbout, setCryptAbout] = useState<CryptFromFetch>(dataToShow[0]);

  function aboutCrypt(cryptId: string) {
    navigate(`/${cryptId}`);
  }

  function addCryptToWallet(e: any, crypt: CryptFromFetch) {
    e.stopPropagation();

    setIsPopupOpen(true);
    setCryptAbout(crypt);
  }

  return (
    <section className="table">
      <div className="table-header">
        <p className="rank table-header__item">Rank</p>
        <p className="name table-header__item">Name</p>
        <p className="symbol table-header__item">Symbol</p>
        <p className="price table-header__item">Price</p>
        <p className="change table-header__item">Change (24h)</p>
        <p className="add table-header__item">Add to Wallet</p>
      </div>
      {dataToShow.map((crypt: CryptFromFetch) => {
        return (
          <div
            className="table__line"
            key={crypt.id}
            onClick={() => aboutCrypt(crypt.id)}
          >
            <p className="rank">{crypt.rank}</p>
            <p className="name">{crypt.name}</p>
            <p className="symbol">{crypt.symbol}</p>
            <p className="price">{(+crypt.priceUsd).toFixed(5)} $</p>
            <div className="change">
              <div className="change__content">
                <p className={crypt.changePercent24Hr < 0 ? "lower" : ""}>
                  {crypt.changePercent24Hr > 0 && "+"}
                  {(+crypt.changePercent24Hr).toFixed(4)}%
                </p>
                <img
                  src={crypt.changePercent24Hr < 0 ? arrowDown : arrowUp}
                  alt="arrow"
                />
              </div>
            </div>
            <button className="add" onClick={(e) => addCryptToWallet(e, crypt)}>
              Add
            </button>
          </div>
        );
      })}
      <AddCryptModal
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        cryptAbout={cryptAbout}
      />
    </section>
  );
}
