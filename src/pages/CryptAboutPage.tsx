import { useEffect, useState } from "react";
import { useParams } from "react-router";
import spinner from "../components/generic/icons/spinner.svg";
import "../components/crypt/cryptAbout.scss";
import Graph from "../components/crypt/Graph";
import AddCryptModal from "../components/crypt/AddCryptModal";
import {
  CryptMarket,
  CryptFromFetch,
  DataAboutCrypt,
  ButtonTypes,
  TableTypes,
} from "../types";
import Button from "../components/generic/button/Button";
import Table from "../components/generic/table/Table";
import { useQuery } from "@apollo/client";
import { GET_CRYPT_ABOUT } from "../lib/query/crypt";

export default function CryptAboutPage() {
  const { cryptId } = useParams<{ cryptId: string }>();

  const { data, loading, error } = useQuery(GET_CRYPT_ABOUT, {
    variables: {
      id: cryptId,
    },
  });

  const [crypt, setCrypt] = useState<DataAboutCrypt>(data?.getCryptAbout);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [cryptAbout, setCryptAbout] = useState<CryptFromFetch>(
    data?.getCryptAbout.about
  );

  useEffect(() => {
    !loading && setCrypt(data?.getCryptAbout);
  }, [cryptId, loading]);

  function addCryptToWallet() {
    setIsPopupOpen(true);
    setCryptAbout(data?.getCryptAbout.about);
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
      {!loading && crypt ? (
        <div>
          <h1 className="content__title content__title_big">
            {crypt.rates?.currencySymbol} {crypt.about.name}
          </h1>
          <div className="two-columns">
            <ul className="crypt-about">
              <li className="crypt__item">
                Rank:{" "}
                <span className="crypt__item crypt__item_bold">
                  {crypt.about.rank}
                </span>
              </li>
              <li className="crypt__item">
                Symbol:{" "}
                <span className="crypt__item crypt__item_bold">
                  {crypt.about.symbol}
                </span>
              </li>
              <li className="crypt__item">
                VW Price:{" "}
                <span className="crypt__item crypt__item_bold">
                  {(+crypt.about.priceUsd).toFixed(6)}$
                </span>
              </li>
              <li className="crypt__item">
                Change in the last 24h:
                <span
                  className={`crypt__item ${
                    +crypt.about.changePercent24Hr > 0
                      ? "crypt__item_high"
                      : "crypt__item_low"
                  }`}
                >
                  {" "}
                  {(+crypt.about.changePercent24Hr).toFixed(4)}%
                </span>
              </li>
              <li className="crypt__item">
                Supply:{" "}
                <span className="crypt__item crypt__item_bold">
                  {+crypt.about.supply}
                </span>
              </li>
              <li className="crypt__item">
                Market Cap USD:{" "}
                <span className="crypt__item crypt__item_bold">
                  {+crypt.about.marketCapUsd}$
                </span>
              </li>
              <Button
                buttonType={ButtonTypes.button_action}
                onClick={addCryptToWallet}
              >
                Add to Wallet
              </Button>
            </ul>
            <div className="crypt-graph">
              <Graph historyProp={crypt.historyPerDay} />
            </div>
          </div>
          <div className="markets-block">
            <h2 className="content__title content__title_sm">TOP-10 Markets</h2>

            <Table
              type={TableTypes.table_markets}
              headers={createDataForTableMain().headers}
              lines={createDataForTableMain(crypt.markets).lines}
              borderBottomColor="border_black"
            />
          </div>
        </div>
      ) : (
        <img className="preloader__item" src={spinner} alt="spinner" />
      )}
      <AddCryptModal
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        cryptAbout={cryptAbout}
      />
    </section>
  );
}
