import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { CryptHistory } from "../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface GraphProps {
  name: string;
  history: Array<CryptHistory>;
}

export default function Graph({ name, history }: GraphProps) {
  const [newPer, setNewPer] = useState<Array<CryptHistory>>(history);

  const data = {
    labels: newPer.map((item: CryptHistory) => item.date.slice(0, 10)),
    datasets: [
      {
        label: name + `'s price in USD per year (every week)`,
        borderColor: "rgb(7, 43, 52)",
        data: newPer.map((item: CryptHistory) => (+item.priceUsd).toFixed(2)),
      },
    ],
  };

  useEffect(() => {
    const arr: Array<CryptHistory> = [];

    history.forEach((item, index) => {
      index === 0 || ((index + 1) % 7 === 0 && arr.push(item));
    });

    setNewPer(arr);
  }, []);

  return <Line options={{}} data={data} />;
}
