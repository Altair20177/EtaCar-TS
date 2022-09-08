import "../main.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import arrowUp from "./mainTableIcons/arrowUp.svg";
import arrowDown from "./mainTableIcons/arrowDown.svg";
import { useNavigate } from "react-router";
import AddCryptModal from "../../crypt/AddCryptModal";
import { useState } from "react";
import { ButtonTypes, CryptFromFetch } from "../../../types";
import Button from "../../generic/button/Button";

export interface TableProps {
  dataToShow: Array<CryptFromFetch>;
  pageWidth: number;
}

export default function TableMain({ dataToShow, pageWidth }: TableProps) {
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
        <p className="name crypts-header__item adaptive">Name</p>
        <p className="symbol crypts-header__item">Symbol</p>
        <p className="price crypts-header__item">Price</p>
        <p className="change crypts-header__item">Change (24h)</p>
        <p className="add crypts-header__item">Add to Wallet</p>
      </div>
      {dataToShow.length
        ? dataToShow.map((crypt: CryptFromFetch) => {
            return (
              <div
                className="crypts__line"
                key={crypt.id}
                onClick={() => aboutCrypt(crypt.id)}
              >
                <p className="rank">{crypt.rank}</p>
                <p className="name adaptive">{crypt.name}</p>
                <p className="symbol">{crypt.symbol}</p>
                <p className="price">{(+crypt.priceUsd).toFixed(5)}$</p>
                <div className="change">
                  <div className="change__content">
                    <p
                      className={
                        crypt.changePercent24Hr < 0 ? "change__content_low" : ""
                      }
                    >
                      {crypt.changePercent24Hr > 0 && "+"}
                      {(+crypt.changePercent24Hr).toFixed(4)}%
                    </p>
                    <img
                      src={crypt.changePercent24Hr < 0 ? arrowDown : arrowUp}
                      alt="arrow"
                      className="change__image adaptive"
                    />
                  </div>
                </div>
                <Button
                  onClick={(e) => addCryptToWallet(e, crypt)}
                  buttonType={ButtonTypes.button_action}
                >
                  Add
                </Button>
              </div>
            );
          })
        : [...Array(10).keys()].map((line) => (
            <div className="crypts__line" key={line}>
              <Skeleton className="skeleton" width={20} height={20} />
              {pageWidth > 640 && (
                <Skeleton className="skeleton" width={170} height={20} />
              )}
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 50 : 30}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 150 : 100}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 110 : 60}
                height={20}
              />
              <Skeleton
                className="skeleton"
                width={pageWidth > 640 ? 72 : 52}
                height={pageWidth > 640 ? 44 : 34}
              />
            </div>
          ))}
      <AddCryptModal
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        cryptAbout={cryptAbout}
      />
    </section>
  );
}
