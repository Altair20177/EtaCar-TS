import * as d3 from "d3";
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
      .attr("transform", `translate(${props.width / 2},${props.height / 2})`);

    const g = svg.selectAll("path").data(dataCrypts).enter().append("g");

    g.append("path")
      .attr("d", createArc)
      .style("fill", (d) => colors(d.data.symbol));

    g.append("text")
      .attr("transform", (d) => "translate(" + createArc.centroid(d) + ")")
      .attr("textAnchor", "middle")
      .attr("alignmentBaseline", "middle")
      .attr("fill", "white")
      .text((d) => d.data.symbol);
  }, [walletCrypts]);

  return (
    <svg className="pie" ref={ref} width={props.width} height={props.height} />
  );
}
