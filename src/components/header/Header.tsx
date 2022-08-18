import "./header.scss";
import wallet from "./wallet.svg";
import logo from "./neo.svg";
import { useNavigate } from "react-router";
import { useState } from "react";
import WalletModal from "./header-wallet/WalletModal";
import { Crypt } from "../../types";
import { useAppSelector } from "../../hooks";

export default function Header() {
  const navigate = useNavigate();
  const walletData = useAppSelector((state) => state.walletPage);
  const topCrypts = useAppSelector((state) => state.mainPage);

  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);

  function walletPrice() {
    if (walletData) {
      const sum = walletData.reduce(
        (prev: number, curr: Crypt) => prev + curr.amount * Number(curr.price),
        0
      );
      const diff1 = walletData.reduce(
        (prev: number, curr: Crypt) =>
          prev + curr.amount * Number(curr.price) * Number(curr.change) * 0.01,
        0
      );

      return `${Math.floor(sum * 100) / 100} USD ${
        Math.floor(diff1 * 100) / 100
      }$ (${Math.floor((diff1 / sum) * 10000) / 100}%)`;
    }
  }

  return (
    <header>
      <div className="content header">
        <div className="logo" onClick={() => navigate("/")}>
          <div className="item-wrapper">
            <img src={logo} alt="logo" className="item__icon" />
          </div>
          <p className="logo__name">Cryptorius</p>
        </div>
        <ul className="crypto">
          {[...Array(3).keys()].map((index) => (
            <li
              className="crypto__item"
              key={index}
              onClick={() => navigate(`/${topCrypts[index].id}`)}
            >
              <span className="crypto__name">{topCrypts[index]?.name}</span> -{" "}
              <span
                className={`crypto__price ${
                  topCrypts[index]?.changePercent24Hr < 0 ? "low" : ""
                }`}
              >
                {Math.floor(+topCrypts[index]?.priceUsd * 100) / 100}$
              </span>
            </li>
          ))}
        </ul>
        <div className="item wallet" onClick={() => setIsWalletOpen(true)}>
          <div className="wallet-about">
            <p className="wallet-about__text">My Wallet</p>
            <p className="wallet-about__numbers">
              {walletData && walletData.length ? walletPrice() : "Wallet is empty"}
            </p>
          </div>
          <div className="item-wrapper">
            <img src={wallet} alt="wallet" className="item__icon" />
          </div>
        </div>
      </div>
      <WalletModal
        isWalletOpen={isWalletOpen}
        setIsWalletOpen={setIsWalletOpen}
      />
    </header>
  );
}
