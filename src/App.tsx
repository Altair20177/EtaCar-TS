import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { addDataToTableAction } from "./lib/actions/tableActions";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import CryptAbout from "./components/crypt/CryptAbout";
import { addCryptToWallet } from "./lib/actions/walletActions";
import { Crypt, CryptFromFetch } from "./types";
import { useAppDispatch } from "./hooks";
import { useQuery } from "@apollo/client";
import { GET_ALL_CRYPTS } from "./lib/query/crypt";

function App() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useQuery(GET_ALL_CRYPTS);

  function refreshLocalStorage(
    dataFromStorage: Array<Crypt>,
    dataFromFetch: Array<CryptFromFetch>
  ) {
    const newArr: Array<Crypt> = [];

    dataFromFetch.forEach((itemFromFetch) => {
      dataFromStorage.forEach((itemFromStorage) => {
        if (itemFromFetch.id === itemFromStorage.id) {
          const obj = { ...itemFromStorage };

          obj.change = itemFromFetch.changePercent24Hr;
          obj.price = itemFromFetch.priceUsd;

          newArr.push(obj);
        }
      });
    });
    localStorage.setItem("wallet", JSON.stringify(newArr));
  }

  useEffect(() => {
    !loading && dispatch(addDataToTableAction(data.getAllCrypts));

    const storage = localStorage.getItem("wallet");

    if (storage && !loading) {
      JSON.parse(storage).forEach((item: Crypt) =>
        dispatch(addCryptToWallet(item))
      );
      refreshLocalStorage(JSON.parse(storage), data.getAllCrypts);
    }
  }, [data, loading]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main loading={loading} />} />
        <Route path=":cryptId" element={<CryptAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
