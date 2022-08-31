/* import * as d3 from "d3";
import { PieArcDatum } from "d3";
import { useLayoutEffect, useRef } from "react";
import { Crypt } from "../../../types";

export interface PieChartProps {
  data: Array<Crypt>;
  innerRadius: number;
  outerRadius: number;
  height: number;
  width: number;
}

export type WalletCrypts = {
  amount: number;
  symbol: string;
};

export default function PieChart(props: PieChartProps) {
  const walletCrypts = props.data.map((crypt: Crypt) => {
    return {
      symbol: crypt.symbol,
      amount: crypt.amount,
    };
  }) as WalletCrypts[];

  const ref = useRef<SVGSVGElement>(null);

  const createPie = d3
    .pie<WalletCrypts>()
    .value((d) => d.amount)
    .sort(null);

  const createArc = d3
    .arc<PieArcDatum<WalletCrypts>>()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);

  const colors = d3.scaleOrdinal(d3.schemeSet1);
  const dataCrypts = createPie(walletCrypts);

  useLayoutEffect(() => {
    const svg = d3
      .select(ref.current)
      .append("g")
      .attr(
        "transform",
        `translate(${props.outerRadius} ${props.outerRadius})`
      );

    const g = svg.selectAll("path").data(dataCrypts).enter().append("g");

    g.append("path")
      .attr("d", createArc)
      .style("fill", (d) => colors(d.data.symbol));

    g.append("text")
      .attr("transform", (d) => "translate(" + createArc.centroid(d) + ")")
      .attr("fill", "white")
      .text((d) => d.data.amount);
  }, [walletCrypts]);

  return (
    <svg className="pie" ref={ref} width={props.width} height={props.height} />
  );
}
 */

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Crypt } from "../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  data: Array<Crypt>;
  /*   innerRadius: number;
  outerRadius: number;
  height: number;
  width: number; */
}

export default function PieChart({ data }: PieChartProps) {
  console.log(data);

  function createColor(opacity: number) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + `,${opacity})`;
  }

  const dataToPie = {
    labels: data.map((item) => item.symbol),
    datasets: [
      {
        label: "# of Crypts",
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item) => createColor(0.2)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={dataToPie} />;
}
