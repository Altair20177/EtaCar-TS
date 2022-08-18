export type Crypt = {
  amount: number;
  change: number | string;
  id: string;
  name: string;
  price: string | number;
  amountToDelete?: number;
};

export type CryptFromFetch = {
  changePercent24Hr: string | number;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
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
  time: number;
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
