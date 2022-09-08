import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Crypt } from "../../../types";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartProps {
  data: Array<Crypt>;
}

export default function PieChart({ data }: PieChartProps) {
  function createColorPart(num: number, index: number) {
    let value = index * num + 20;

    if (value <= 254) return value;
    else {
      while (value > 254) {
        value = value - (num / 2) * (index / 4) + 5;
      }

      return Math.floor(value);
    }
  }

  function createColor(index: number) {
    const r = Math.floor(createColorPart(30, index));
    const g = Math.floor(createColorPart(60, index));
    const b = Math.floor(createColorPart(90, index));

    return "rgba(" + r + "," + g + "," + b + `,0.4)`;
  }

  const dataToPie = {
    labels: data.map((item) => item.symbol),
    datasets: [
      {
        label: "# of Crypts",
        data: data.map((item) => item.amount),
        backgroundColor: data.map((item, index) => createColor(index)),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={dataToPie} />;
}
