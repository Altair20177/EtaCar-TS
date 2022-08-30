/* import {
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
import { useEffect, useState } from "react"; */
import { CryptHistory } from "../../types";
import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";

/* ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
); */

export interface GraphProps {
  graphColor?: string;
  fillColor?: string;
  historyProp: Array<CryptHistory>;
}

export type NewHistory = {
  date: Date;
  priceUsd: number;
};

export default function Graph({
  historyProp,
  graphColor = "black",
  fillColor = "none",
}: GraphProps) {
  const history = historyProp.map((d: CryptHistory) => {
    return {
      date: new Date(d.date),
      priceUsd: +(+d.priceUsd).toFixed(4),
    };
  }) as NewHistory[];

  const width = 700;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  const x = d3
    .scaleUtc()
    .domain(d3.extent(history, (d) => d.date) as [Date, Date])
    .range([margin.left, width - margin.right]);

  const y = d3
    .scaleLinear<number>()
    .domain([
      d3.min(history, (d) => +d.priceUsd),
      d3.max(history, (d) => +d.priceUsd),
    ] as [number, number])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const line = d3
    .line<NewHistory>()
    .defined((d) => !isNaN(+d.priceUsd))
    .x((d) => x(d.date))
    .y((d) => y(+d.priceUsd));

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g transform={`translate(0,${height - margin.bottom})`}>
        <Axis scale={x} orient={Orient.bottom} />
      </g>
      <g transform={`translate(${margin.left},0)`}>
        <Axis scale={y} orient={Orient.left} />
      </g>
      <path
        fill={fillColor}
        stroke={graphColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        d={line(history) as string}
      />
    </svg>
  );

  /* const [newPer, setNewPer] = useState<Array<CryptHistory>>(history);

  const data = {
    labels: newPer.map((item: CryptHistory) => item.date.slice(0, 10)),
    datasets: [
      {
        label: name + `'s price in USD per year (every week)`,
        borderColor: "rgb(7, 43, 52)",
        data: newPer.map((item: CryptHistory) => (+item.priceUsd).toFixed(6)),
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

  return <Line options={{}} data={data} />; */
}
