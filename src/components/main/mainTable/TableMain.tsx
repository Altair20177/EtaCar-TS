import "../main.scss";

import arrowUp from "./mainTableIcons/arrowUp.svg";
import arrowDown from "./mainTableIcons/arrowDown.svg";
import { useNavigate } from "react-router";
import AddCryptModal from "../../crypt/AddCryptModal";
import { useState } from "react";
import { CryptFromFetch } from "../../../types";
import Button from "../../generic/genericButton/Button";

export interface TableProps {
  dataToShow: Array<CryptFromFetch>;
}

export default function TableMain({ dataToShow }: TableProps) {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [cryptAbout, setCryptAbout] = useState<CryptFromFetch>(dataToShow[0]);

  function aboutCrypt(cryptId: string) {
    navigate(`/${cryptId}`);
  }

  function addCryptToWallet(e: React.MouseEvent, crypt: CryptFromFetch) {
    e.stopPropagation();

    setIsPopupOpen(true);
    setCryptAbout(crypt);
  }

  return (
    <section className="crypts">
      <div className="crypts-header">
        <p className="rank crypts-header__item">Rank</p>
        <p className="name crypts-header__item">Name</p>
        <p className="symbol crypts-header__item">Symbol</p>
        <p className="price crypts-header__item">Price</p>
        <p className="change crypts-header__item">Change (24h)</p>
        <p className="add crypts-header__item">Add to Wallet</p>
      </div>
      {dataToShow.map((crypt: CryptFromFetch) => {
        return (
          <div
            className="crypts__line"
            key={crypt.id}
            onClick={() => aboutCrypt(crypt.id)}
          >
            <p className="rank">{crypt.rank}</p>
            <p className="name">{crypt.name}</p>
            <p className="symbol">{crypt.symbol}</p>
            <p className="price">{(+crypt.priceUsd).toFixed(5)}$</p>
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
            <Button onClick={(e) => addCryptToWallet(e, crypt)} type="action">
              Add
            </Button>
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