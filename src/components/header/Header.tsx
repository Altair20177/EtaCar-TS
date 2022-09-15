import "./header.scss";
import wallet from "./icons/wallet.svg";
import logo from "./icons/neo.svg";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import WalletModal from "./wallet/WalletModal";
import { Crypt, CryptFromFetch } from "../../types";
import { useAppSelector } from "../../hooks";

import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS } from "../../lib/query/crypt";
import Skeleton from "react-loading-skeleton";

export default function Header() {
  const navigate = useNavigate();
  const walletData = useAppSelector((state) => state.walletPage);

  const { data, loading, error } = useQuery(GET_ALL_CRYPTS, {
    variables: {
      offset: 0,
      limit: 3,
    },
  });

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
              onClick={() => navigate(`/${data?.getAllCrypts[index].id}`)}
            >
              {!loading && data?.getAllCrypts.length ? (
                <>
                  <span className="crypto__name">
                    {data?.getAllCrypts[index]?.name}
                  </span>{" "}
                  -{" "}
                  <span
                    className={`crypto__price ${
                      data?.getAllCrypts[index]?.changePercent24Hr < 0
                        ? "crypto__price_low"
                        : ""
                    }`}
                  >
                    {Math.floor(+data?.getAllCrypts[index]?.priceUsd * 100) /
                      100}
                    $
                  </span>
                </>
              ) : (
                <Skeleton width={150} height={25} />
              )}
            </li>
          ))}
        </ul>
        <div className="item wallet" onClick={() => setIsWalletOpen(true)}>
          <div className="wallet-about">
            <p className="wallet-about__text">My Wallet</p>
            <p className="wallet-about__numbers">
              {walletData && walletData.length
                ? walletPrice()
                : "Wallet is empty"}
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
