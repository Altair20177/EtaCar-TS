export default async function createDataAbourCrypt(cryptId: string | undefined) {
  const aboutPromise = await fetch(
    `https://api.coincap.io/v2/assets/${cryptId}`
  );
  const about = await aboutPromise.json();

  const historyPerDayPromise = await fetch(
    `https://api.coincap.io/v2/assets/${cryptId}/history?interval=d1`
  );
  const historyPerDay = await historyPerDayPromise.json();

  const marketsPromise = await fetch(
    `https://api.coincap.io/v2/assets/${cryptId}/markets`
  );
  const markets = await marketsPromise.json();

  const ratesPromise = await fetch(
    `https://api.coincap.io/v2/rates/${cryptId}`
  );
  const rates = await ratesPromise.json();

  const obj = {
    about: about.data,
    historyPerDay: historyPerDay.data,
    markets: markets.data,
    rates: rates.data,
  };

  return obj;
}
