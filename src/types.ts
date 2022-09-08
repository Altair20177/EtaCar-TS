export type Crypt = {
  amount: number;
  change: number | string;
  id: string;
  name: string;
  price: string | number;
  amountToDelete?: number;
  symbol?: string;
};

export type CryptFromFetch = {
  changePercent24Hr: string | number;
  explorer?: string;
  id: string;
  marketCapUsd: string;
  maxSupply?: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr?: string;
  vwap24Hr?: string;
};

export type CryptMarket = {
  baseId: string;
  baseSymbol: string;
  exchangeId: string;
  priceUsd: string;
  quoteId: string;
  quoteSymbol: string;
  volumePercent: string;
  volumeUsd24Hr: string;
};

export type CryptHistory = {
  date: string;
  priceUsd: string;
  time?: number;
};

export type DataAboutCrypt = {
  about: CryptFromFetch;
  rates: {
    currencySymbol: string | null;
    id: string;
    rateUsd: string;
    symbol: string;
    type: string;
  };
  markets: Array<CryptMarket>;
  historyPerDay: Array<CryptHistory>;
};

export type State = {
  mainPage: Array<CryptFromFetch>;
  cryptPage: DataAboutCrypt;
  walletPage: Array<Crypt>;
};

export enum ButtonTypes {
  button_pagination = "button_pagination",
  button_delete = "button_delete",
  button_action = "button_action",
  button_slide = "button_slide",
}

export enum TableTypes {
  table_markets = "table_markets",
  table_wallet = "table_wallet",
}