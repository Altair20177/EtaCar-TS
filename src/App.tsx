import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainPage from "./pages/MainPage";
import CryptAboutPage from "./pages/CryptAboutPage";
import { addCryptToWallet } from "./lib/actions/walletActions";
import { Crypt, CryptFromFetch } from "./types";
import { useAppDispatch } from "./hooks";
import { useQuery } from "@apollo/client";
import { GET_FRESH_DATA_ABOUT_WALLET } from "./lib/query/crypt";

function App() {
  const dispatch = useAppDispatch();
  const [ids, setIds] = useState<string>("");

  const {
    data: freshCrypts,
    loading,
    error,
  } = useQuery(GET_FRESH_DATA_ABOUT_WALLET, {
    variables: {
      ids: ids,
    },
  });

  function refreshLocalStorage(dataFromStorage: Crypt[]) {
    const idsStr = dataFromStorage.reduce(
      (prev: string, curr: Crypt) => prev + "," + curr.id,
      ""
    );

    setIds(idsStr.slice(1));
    const newArr: Array<Crypt> = [];

    freshCrypts?.getFreshDataAboutWallet.forEach(
      (itemFromFetch: CryptFromFetch) => {
        dataFromStorage.forEach((itemFromStorage: Crypt) => {
          if (itemFromFetch.id === itemFromStorage.id) {
            const obj = { ...itemFromStorage };

            obj.change = itemFromFetch.changePercent24Hr;
            obj.price = itemFromFetch.priceUsd;

            newArr.push(obj);
          }
        });
      }
    );
    localStorage.setItem("wallet", JSON.stringify(newArr));
  }

  useEffect(() => {
    const storage = localStorage.getItem("wallet");

    storage && !loading && refreshLocalStorage(JSON.parse(storage));
  }, [freshCrypts, loading]);

  useEffect(() => {
    const storage = localStorage.getItem("wallet");

    storage &&
      JSON.parse(storage).forEach((item: Crypt) =>
        dispatch(addCryptToWallet(item))
      );
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path=":cryptId" element={<CryptAboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
