import { gql } from "@apollo/client";

export const GET_ALL_CRYPTS = gql`
  query getAllCrypts($offset: Int, $limit: Int) {
    getAllCrypts(offset: $offset, limit: $limit) {
      id
      rank
      symbol
      name
      priceUsd
      changePercent24Hr
    }
  }
`;

export const GET_CRYPT_ABOUT = gql`
  query getCryptAbout($id: ID) {
    getCryptAbout(id: $id) {
      about {
        id
        rank
        name
        symbol
        priceUsd
        changePercent24Hr
        supply
        marketCapUsd
      }
      historyPerDay {
        date
        priceUsd
      }
      rates {
        id
        currencySymbol
      }
      markets {
        exchangeId
        baseId
        quoteSymbol
        priceUsd
      }
    }
  }
`;

export const GET_PAGES_AMOUNT = gql`
  query {
    getPagesAmount
  }
`;

export const GET_FRESH_DATA_ABOUT_WALLET = gql`
  query getFreshDataAboutWallet($ids: String) {
    getFreshDataAboutWallet(ids: $ids) {
      id
      rank
      symbol
      name
      priceUsd
      changePercent24Hr
    }
  }
`;
