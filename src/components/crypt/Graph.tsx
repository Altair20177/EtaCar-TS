import { CryptHistory } from "../../types";
import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";

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
}
