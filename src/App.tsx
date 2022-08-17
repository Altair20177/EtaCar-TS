import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDataToTableAction } from "./lib/actions/tableActions";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import CryptAbout from "./components/crypt/CryptAbout";
import { addCryptToWallet } from "./lib/actions/walletActions";
import { Crypt, CryptFromFetch } from "./types";

function App() {
  const dispatch = useDispatch();

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
    async function fetchData() {
      const res = await fetch("https://api.coincap.io/v2/assets/");
      const data = await res.json();

      dispatch(addDataToTableAction(data.data));

      const storage = localStorage.getItem("wallet");

      if (storage) {
        JSON.parse(storage).forEach((item: Crypt) => dispatch(addCryptToWallet(item)));
        refreshLocalStorage(JSON.parse(storage), data.data);
      }
    }

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path=":cryptId" element={<CryptAbout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
