import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addDataAboutCrypt } from "../../lib/actions/cryptAboutActions";
import createDataAbourCrypt from "./createDataAbourCrypt";
import spinner from "../generic/Spinner2.svg";
import "./cryptAbout.scss";
import Graph from "./Graph";
import AddCryptModal from "./AddCryptModal";
import { CryptMarket, CryptFromFetch } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function CryptAbout() {
  const { cryptId } = useParams<{ cryptId: string }>();
  const dispatch = useAppDispatch();
  const dataAboutCrypt = useAppSelector((state) => state.cryptPage);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [cryptAbout, setCryptAbout] = useState<CryptFromFetch>(
    dataAboutCrypt?.about
  );

  useEffect(() => {
    createDataAbourCrypt(cryptId).then((res) =>
      dispatch(addDataAboutCrypt(res))
    );
  }, [cryptId]);

  function addCryptToWallet() {
    setIsPopupOpen(true);
    setCryptAbout(dataAboutCrypt.about);
  }

  return (
    <section className="content">
      {!Object.keys(dataAboutCrypt).length ||
      cryptId !== dataAboutCrypt.about.id ? (
        <img className="preloader__item" src={spinner} alt="spinner" />
      ) : (
        <div>
          <h1 className="title">
            {dataAboutCrypt.rates?.currencySymbol} {dataAboutCrypt.about.name}
          </h1>

          <div className="two-columns">
            <ul className="crypt-about">
              <li className="crypt__item">
                Rank: <span>{dataAboutCrypt.about.rank}</span>
              </li>
              <li className="crypt__item">
                Symbol: <span>{dataAboutCrypt.about.symbol}</span>
              </li>
              <li className="crypt__item">
                VW Price:{" "}
                <span>{(+dataAboutCrypt.about.priceUsd).toFixed(4)}$</span>
              </li>
              <li className="crypt__item">
                Change in the last 24h:
                <span
                  className={`${
                    +dataAboutCrypt.about.changePercent24Hr > 0 ? "high" : "low"
                  }`}
                >
                  {" "}
                  {(+dataAboutCrypt.about.changePercent24Hr).toFixed(4)}%
                </span>
              </li>
              <li className="crypt__item">
                Supply: <span>{+dataAboutCrypt.about.supply}</span>
              </li>
              <li className="crypt__item">
                Market Cap USD:{" "}
                <span>{+dataAboutCrypt.about.marketCapUsd}$</span>
              </li>
              <li className="crypt__add" onClick={addCryptToWallet}>
                Add to Wallet
              </li>
            </ul>
            <div className="crypt-graph">
              <Graph
                name={dataAboutCrypt.about.name}
                history={dataAboutCrypt.historyPerDay}
              />
            </div>
          </div>
          <div className="markets">
            <h2 className="title">TOP-10 Markets</h2>
            <ul className="markets-list">
              <li className="markets-line markets-header">
                <p className="markets__id">№</p>
                <p className="markets__name">Market Name</p>
                <p className="markets__price">Price</p>
                <p className="markets__base">Base</p>
                <p className="markets__quote">Quote</p>
              </li>
              {dataAboutCrypt.markets
                .slice(0, 10)
                .map((item: CryptMarket, index: number) => (
                  <li className="markets-line" key={index}>
                    <p className="markets__id">{index + 1}</p>
                    <p className="markets__name">{item.exchangeId}</p>
                    <p className="markets__price">
                      {(+item.priceUsd).toFixed(3)} $
                    </p>
                    <p className="markets__base">{item.baseId}</p>
                    <p className="markets__quote">{item.quoteSymbol}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
      <AddCryptModal
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        cryptAbout={cryptAbout}
      />
    </section>
  );
}
