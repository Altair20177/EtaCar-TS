import { gql } from "@apollo/client";

export const GET_ALL_CRYPTS = gql`
  query {
    getAllCrypts {
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
