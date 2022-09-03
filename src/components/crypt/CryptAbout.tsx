import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { addDataAboutCrypt } from "../../lib/actions/cryptAboutActions";
import spinner from "../generic/icons/spinner.svg";
import "./cryptAbout.scss";
import Graph from "./Graph";
import AddCryptModal from "./AddCryptModal";
import { CryptMarket, CryptFromFetch } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../generic/button/Button";
import Table from "../generic/table/Table";
import { useQuery } from "@apollo/client";
import { GET_CRYPT_ABOUT } from "../../lib/query/crypt";

export default function CryptAbout() {
  const { cryptId } = useParams<{ cryptId: string }>();
  const dispatch = useAppDispatch();
  const dataAboutCrypt = useAppSelector((state) => state.cryptPage);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [cryptAbout, setCryptAbout] = useState<CryptFromFetch>(
    dataAboutCrypt?.about
  );

  const { data, loading, error } = useQuery(GET_CRYPT_ABOUT, {
    variables: {
      id: cryptId,
    },
  });

  useEffect(() => {
    !loading && dispatch(addDataAboutCrypt(data?.getCryptAbout));
  }, [cryptId, loading]);

  function addCryptToWallet() {
    setIsPopupOpen(true);
    setCryptAbout(dataAboutCrypt.about);
  }

  function createDataForTableMain(markets?: Array<CryptMarket>) {
    const data: { headers: string[]; lines: string[][] } = {
      headers: ["№", "Market Name", "Price", "Base", "Quote"],
      lines: [],
    };

    markets &&
      markets.slice(0, 10).forEach((market, index) => {
        const obj = {
          number: String(index + 1),
          exchangeId: market.exchangeId,
          priceUsd: String((+market.priceUsd).toFixed(6)) + " $",
          baseId: market.baseId,
          quoteSymbol: market.quoteSymbol,
        };

        const arr: string[] = [...Object.values(obj)];
        data.lines.push(arr);
      });

    return data;
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
                <span>{(+dataAboutCrypt.about.priceUsd).toFixed(6)}$</span>
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
              <Button type="action" onClick={addCryptToWallet}>
                Add to Wallet
              </Button>
            </ul>
            <div className="crypt-graph">
              <Graph
                historyProp={dataAboutCrypt.historyPerDay}
              />
            </div>
          </div>
          <div className="markets-block">
            <h2 className="title">TOP-10 Markets</h2>

            <Table
              type="markets"
              headers={createDataForTableMain().headers}
              lines={createDataForTableMain(dataAboutCrypt.markets).lines}
              borderBottomColor="black"
            />
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
